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
        css_block_match = re.search(r'<style id=\'bricks-frontend-inline-inline-css\'%(.*?)</style>', html, re.DOTALL)
        css_content = css_block_match.group(1) if css_block_match else ""
        
        id_to_image = {}
        # Find all ID definitions with background images
        # Note: CSS might be minified, so we search globally in the block
        bg_matches = re.findall(r'#([a-zA-Z0-9-_]+)[^{]*\{%s*background-image:\s*url([\'"?(https?://[^)\'"]+)["']?)\'', css_content)
        for element_id, img_url in bg_matches:
            id_to_image[element_id] = img_url

        # 2. Extract Main Content and Truncate at "Naše projekty"
        main_match = re.search(r'<main id="brx-content">(.*?)</main>', html, re.DOTALL)
        if not main_match:
            print(f"Warning: No main content found for {url}", file=sys.stderr)
            continue
            
        main_html = main_match.group(1)
        
        # Stop at "Naše projekty" or "Tvorba" section
        # We look for the container wrapping these texts usually
        stop_markers = ['>Naše projekty<', '>Tvorba<', '>Tvorba&nbsp;<', 'id="brx-footer"']
        split_index = len(main_html)
        
        for marker in stop_markers:
            idx = main_html.find(marker)
            if idx != -1 and idx < split_index:
                # Backtrack to the beginning of the containing section if possible?
                # For simplicity, just cut at the marker. The elements appear sequentially.
                split_index = idx
        
        content_html = main_html[:split_index]
        
        # 3. Iterate through elements in order to find images
        # We look for ids that match our CSS map AND img tags
        
        project_images = []
        
        # Regex to find tags with ids or img tags
        # We scan the string linearly
        
        # Tokenize by tags approximately
        tags = re.finditer(r'<[^>]+>', content_html)
        
        for tag_match in tags:
            tag_str = tag_match.group(0)
            
            # Check for ID match in CSS map
            id_match = re.search(r'id=["']([a-zA-Z0-9-_]+)["']', tag_str)
            if id_match:
                el_id = id_match.group(1)
                if el_id in id_to_image:
                    img = id_to_image[el_id]
                    if img not in project_images:
                        project_images.append(img)
            
            # Check for img src
            if '<img' in tag_str:
                src_match = re.search(r'src=["'](https?://[^"\\]+)["']', tag_str)
                if src_match:
                    img = src_match.group(1)
                    # Filter logos/placeholders
                    if 'logo' not in img.lower() and 'placeholder' not in img.lower() and 'output-onlinepngtools' not in img.lower():
                         if img not in project_images:
                            project_images.append(img)

        # Filter out low-res thumbnails if high-res exists?
        # Actually, let's filter out any URL that contains dimensions like -768x513 if the base URL isn't there?
        # A simple heuristic: ignore images with dimensions in filename if we have "enough" images?
        # Or just keep them all. The user asked to scrape "photos".
        # Let's remove obviously small thumbs if possible.
        # But mostly, the CSS backgrounds are the full high-res ones in this theme (as seen in vmo3746.jpg).
        
        final_images = [img for img in project_images if not img.endswith('.svg')]
        
        # Extract Title
        title_match = re.search(r'<h1[^>]*class="[^" ]*brxe-heading[^" ]*"[^>]*>(.*?)</h1>', content_html, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else "Unknown Project"
        # Clean title HTML entities
        title = title.replace('&nbsp;', ' ')

        results[url] = {
            "title": title,
            "images": final_images,
            "thumbnail": final_images[0] if final_images else ""
        }
        
    except Exception as e:
        print(f"Error processing {url}: {e}", file=sys.stderr)

print(json.dumps(results, indent=2))