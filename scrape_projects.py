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
        # Fetch page
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
        
        # Extract title (H1)
        title_match = re.search(r'<h1[^>]*class="[^"].*brxe-heading[^"].*?>(.*?)</h1>', html, re.IGNORECASE)
        title = title_match.group(1).strip() if title_match else "Unknown Project"
        
        # Split content to stop before "Naše projekty" footer
        # The footer usually starts with "Naše projekty" in an H1 or H3, or "Tvorba"
        # We look for the last occurrence of these if possible, or just split by a known footer ID like "brxe-kdkdly" or "brx-footer"
        
        main_content = html
        if 'id="brx-footer"' in html:
            main_content = html.split('id="brx-footer"')[0]
        elif 'Naše projekty' in html:
             # Find the last occurrence of "Naše projekty" which is likely the footer header
             parts = html.split('Naše projekty')
             if len(parts) > 1:
                 main_content = parts[0]
        
        # Extract background images from sections
        # Pattern: background-image: url(URL)
        # Note: URLs might be in single quotes, double quotes, or no quotes
        bg_images = re.findall(r'background-image:\s*url([\s"\\]?)(https?://[^)]+?\.(?:jpg|png|jpeg))([\s"\\]?)', main_content, re.IGNORECASE)
        
        # Extract img tags
        # Pattern: <img ... src="URL" ...>
        img_tags = re.findall(r'<img[^>]+src=["\\](["\\]?)(https?://[^"\\]+?\.(?:jpg|png|jpeg))["\\]', main_content, re.IGNORECASE)
        
        all_images = []
        seen = set()
        
        # Combine and deduplicate, keeping order
        # Prioritize background images as they seem to be the main gallery items in this theme
        for img_list in bg_images + img_tags:
            img = img_list[1] # The actual URL is the second element in the tuple from the regex
            # Filter out logos, icons, placeholders
            if 'logo' in img.lower() or 'placeholder' in img.lower() or 'favicon' in img.lower():
                continue
            # Filter out low res (300x...) if high res exists? 
            # Actually, let's just take them. The regex captures the full URL.
            # Avoid duplicate processing
            if img not in seen:
                seen.add(img)
                all_images.append(img)
        
        # Filter: Remove images that are clearly not project photos (like white backgrounds, icons)
        filtered_images = [img for img in all_images if not img.endswith('.svg')]

        if not filtered_images:
            print(f"Warning: No images found for {url}", file=sys.stderr)

        results[url] = {
            "title": title,
            "images": filtered_images,
            "thumbnail": filtered_images[0] if filtered_images else ""
        }
        
    except Exception as e:
        print(f"Error processing {url}: {e}", file=sys.stderr)

print(json.dumps(results, indent=2))
