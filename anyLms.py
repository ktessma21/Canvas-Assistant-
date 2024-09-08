import json
from urllib.request import urlopen
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor

def check_url(url):
    try:
        response = urlopen(url)
        return response.status == 200
    except (HTTPError, URLError) as e:
        print(f"Error for {url}: {e}")
        return False
    except Exception as e:
        print(f"An unexpected error occurred for {url}: {e}")
        return False

def find_lms_url(university):
    # Check if the current 'canvas_url' is still null
    if university.get("canvas_url") is None:
        domain = university["domain"]
        parsed_domain = urlparse(domain).netloc
        if parsed_domain.startswith('www.'):
            parsed_domain = parsed_domain[4:]  # Remove 'www.' if it exists

        # Common patterns for various LMS platforms
        lms_patterns = {
            'Blackboard': [
                f"https://blackboard.{parsed_domain}",
                f"https://{parsed_domain}/blackboard"
            ],
            'D2L': [
                f"https://{parsed_domain}.brightspace.com",
                f"https://{parsed_domain}/d2l"
            ],
            'Sakai': [
                f"https://sakai.{parsed_domain}",
                f"https://{parsed_domain}/sakai"
            ]
        }

        # Iterate through each LMS pattern and check for a valid URL
        for lms, urls in lms_patterns.items():
            for lms_url in urls:
                print(f"Checking {lms} URL: {lms_url}")
                if check_url(lms_url):
                    university["canvas_url"] = lms_url  # Replace canvas_url with the valid LMS URL
                    return university

        # If no LMS URL is found, leave it as None
        university["canvas_url"] = None
    return university

def add_lms_url_to_universities(universities):
    with ThreadPoolExecutor(max_workers=20) as executor:
        updated_universities = list(executor.map(find_lms_url, universities))
    return updated_universities

def write_to_json(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)
    print(f"Updated data written to {output_file}")

# Load the input JSON data
with open("universities_with_canvas_urls_updated.json") as file:
    universities = json.load(file)

# Update universities by checking LMS URLs if Canvas URL is null
updated_universities = add_lms_url_to_universities(universities)

# Write the updated data to JSON
output_file = 'universities_with_lms_urls.json'
write_to_json(updated_universities, output_file)
