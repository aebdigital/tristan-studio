import urllib.request
import re
import json
import sys

urls = [
    "https://www.tristanstudio.sk/sidlo-firmy/",
    "https://www.tristanstudio.sk/interier-sidla/",
    "https://www.tristanstudio.sk/bytove-domy-bajkalska/",
    "https://www.tristanstudio.sk/rd-kralova-hora/",
    "https://www.tristanstudio.sk/rd-lubotice/",
    "https://www.tristanstudio.sk/rd-suchonova/",
    "https://www.tristanstudio.sk/projekt-yamaha/",
    "https://www.tristanstudio.sk/projekt-apartmanovy-dom/",
    "https://www.tristanstudio.sk/projekt-optyway/",
    "https://www.tristanstudio.sk/projekt-mukacevska/",
    "https://www.tristanstudio.sk/projekt-rodinne-domy/",
    "https://www.tristanstudio.sk/kasarne-kosice/",
    "https://www.tristanstudio.sk/bytove-domy-teriakovce/",
    "https://www.tristanstudio.sk/rd-lubotice-2/",
    "https://www.tristanstudio.sk/bd-komarno/",
    "https://www.tristanstudio.sk/bd-poprad/",
    "https://www.tristanstudio.sk/grand-bari/"
]

results = {}

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
        
        # 1. Parse CSS
        css_match = re.search(r'<style id=\'bricks-frontend-inline-inline-css\'>(.*?)</style>', html, re.DOTALL)
        css_content = css_match.group(1) if css_match else ""
        
        id_to_image = {}
        # Split by closing brace to get rules
        rules = css_content.split('}')
        for rule in rules:
            if 'background-image' in rule:
                # Find ID: #some-id
                id_match = re.search(r'#([a-zA-Z0-9-_]+)', rule)
                if id_match:
                    el_id = id_match.group(1)
                    # Find URL: url(...)
                    url_match = re.search(r'url\((.*?)\)', rule)
                    if url_match:
                        # Clean quotes
                        clean_url = url_match.group(1).strip().strip('\'"')
                        id_to_image[el_id] = clean_url

        # 2. Extract Main Content
        main_match = re.search(r'<main id="brx-content">(.*?)</main>', html, re.DOTALL)
        main_html = main_match.group(1) if main_match else html
        
        # Truncate at footer
        if 'id="brx-footer"' in main_html:
            main_html = main_html.split('id="brx-footer"')[0]
        elif 'Naše projekty' in main_html:
             main_html = main_html.split('Naše projekty')[0]
        
        project_images = []
        
        # 3. Scan HTML tags
        # We look for ANY tag with id="..." or src="..."
        # Simple tokenizing by <...>
        tags = re.findall(r'<[^>]+>', main_html)
        
        for tag in tags:
            # Check for ID match
            # Match id="val" or id='val'
            id_attr = re.search(r'id=["\']([a-zA-Z0-9-_]+)["\']', tag)
            if id_attr:
                el_id = id_attr.group(1)
                if el_id in id_to_image:
                    img = id_to_image[el_id]
                    if img not in project_images:
                        project_images.append(img)
            
            # Check for IMG src match
            src_attr = re.search(r'src=["\'](https?://[^"\\]+)["\\]', tag)
            if src_attr:
                img = src_attr.group(1)
                if 'logo' not in img and 'placeholder' not in img and 'output-onlinepngtools' not in img:
                    if img not in project_images:
                        project_images.append(img)

        # 4. Filter SVG
        final_images = [img for img in project_images if not img.endswith('.svg')]
        
        # Title
        title_match = re.search(r'<h1[^>]*class="[^" ]*brxe-heading[^" ]*"[^>]*>(.*?)</h1>', html, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else "Unknown"
        title = title.replace('&nbsp;', ' ')

        results[url] = {
            "title": title,
            "images": final_images,
            "thumbnail": final_images[0] if final_images else ""
        }
        
    except Exception as e:
        print(f"Error processing {url}: {e}", file=sys.stderr)

print(json.dumps(results, indent=2))