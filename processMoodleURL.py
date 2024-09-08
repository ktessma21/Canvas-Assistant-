import json
from urllib.request import urlopen
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from concurrent.futures import ThreadPoolExecutor

def check_url(url):
    try:
        # Attempt to open the URL
        response = urlopen(url)
        return response.status == 200
    except (HTTPError, URLError) as e:
        print(f"Error for {url}: {e}")
        return False
    except Exception as e:
        print(f"An unexpected error occurred for {url}: {e}")
        return False

def find_lms_url(university):
    # Check if Canvas URL is null
    if university.get("canvas_url") is None:
        domain = university["domain"]
        parsed_domain = urlparse(domain).netloc
        if parsed_domain.startswith('www.'):
            parsed_domain = parsed_domain[4:]  # Remove 'www.' if it exists

        # Try common Moodle URL patterns
        moodle_urls = [
            f"https://moodle.{parsed_domain}",
            f"https://{parsed_domain}/moodle"
        ]

        # Check each Moodle URL pattern
        for moodle_url in moodle_urls:
            print(f"Checking Moodle URL: {moodle_url}")
            if check_url(moodle_url):
                university["canvas_url"] = moodle_url  # Replace canvas_url with moodle_url
                break
        else:
            university["canvas_url"] = None  # Leave it as None if no Moodle URL is found
    return university

def add_lms_url_to_universities(universities):
    with ThreadPoolExecutor(max_workers=20) as executor:
        # Retry for universities with null canvas_url in parallel
        updated_universities = list(executor.map(find_lms_url, universities))
    return updated_universities

def write_to_json(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)
    print(f"Updated data written to {output_file}")

# Load the input JSON data
with open("universities_with_lms_urls.json") as file:
    universities = json.load(file)

# Update universities by checking Moodle URLs if Canvas URL is null
updated_universities = add_lms_url_to_universities(universities)

# Write the updated data to JSON
output_file = 'universities_with_lms_urls1.json'
write_to_json(updated_universities, output_file)
