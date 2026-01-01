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
        
        # 1. Parse CSS to map IDs to background images
        css_block_match = re.search(r'<style id=\'bricks-frontend-inline-inline-css\'%(.*?)<\/style>', html, re.DOTALL)
        css_content = css_block_match.group(1) if css_block_match else ""
        
        id_to_image = {}
        # Robust parsing by splitting blocks
        blocks = css_content.split('}')
        for block in blocks:
            if 'background-image' in block:
                id_match = re.search(r'#([a-zA-Z0-9-_]+)', block)
                if id_match:
                    el_id = id_match.group(1)
                    # Simple URL extraction
                    url_match = re.search(r'url\(([^)]+)\)', block)
                    if url_match:
                        raw_url = url_match.group(1).strip().strip("'\"")
                        id_to_image[el_id] = raw_url

        # 2. Extract Main Content
        main_match = re.search(r'<main id="brx-content">(.*?)<\/main>', html, re.DOTALL)
        main_html = main_match.group(1) if main_match else html
        
        # Stop at "Naše projekty"
        stop_markers = ['>Naše projekty', '>Tvorba', 'id="brx-footer"']
        split_index = len(main_html)
        
        for marker in stop_markers:
            idx = main_html.find(marker)
            if idx != -1 and idx < split_index:
                split_index = idx
        
        content_html = main_html[:split_index]
        
        # 3. Iterate elements
        project_images = []
        tags = re.findall(r'<[^>]+>', content_html)
        
        for tag_str in tags:
            # Check ID
            id_match = re.search(r'id=["']([a-zA-Z0-9-_]+)["']', tag_str)
            if id_match:
                el_id = id_match.group(1)
                if el_id in id_to_image:
                    img = id_to_image[el_id]
                    if img not in project_images:
                        project_images.append(img)
            
            # Check src
            if '<img' in tag_str:
                src_match = re.search(r'src=["'](https?://[^"']+)["']', tag_str)
                if src_match:
                    img = src_match.group(1)
                    if 'logo' not in img.lower() and 'placeholder' not in img.lower() and 'output-onlinepngtools' not in img.lower():
                         if img not in project_images:
                            project_images.append(img)

        # 4. Final filter
        final_images = [img for img in project_images if not img.endswith('.svg')]
        
        # Title
        title_match = re.search(r'<h1[^>]*class="[^ vital]*brxe-heading[^ vital]*"[^>]*>(.*?)<\/h1>', content_html, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else "Unknown Project"
        title = title.replace('&nbsp;', ' ')

        results[url] = {
            "title": title,
            "images": final_images,
            "thumbnail": final_images[0] if final_images else ""
        }
        
    except Exception as e:
        print(f"Error processing {url}: {e}", file=sys.stderr)

print(json.dumps(results, indent=2))
