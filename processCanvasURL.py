import json
from urllib.request import urlopen
from urllib.error import HTTPError, URLError
from concurrent.futures import ThreadPoolExecutor
from urllib.parse import urlparse

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

def retry_canvas_url(university):
    # Check if Canvas URL is null
    if university.get("canvas_url") is None:
        domain = university["domain"]
        # Extract university name from the domain
        parsed_domain = urlparse(domain).netloc
        if parsed_domain.startswith('www.'):
            parsed_domain = parsed_domain[4:]  # Remove 'www.' if it exists

        # Try a new format: https://canvas.{name}.edu/
        university_name = parsed_domain.split('.')[0]
        new_canvas_url = f"https://canvas.{university_name}.edu"
        print(f"Retrying with URL: {new_canvas_url}")

        # Check the new Canvas URL
        if check_url(new_canvas_url):
            university["canvas_url"] = new_canvas_url
        else:
            print(f"Failed to find Canvas URL for {university['name']} with both formats.")
    return university

def add_canvas_url_to_universities(universities):
    with ThreadPoolExecutor(max_workers=20) as executor:  # Adjust max_workers as needed
        # Retry for universities with null canvas_url in parallel
        updated_universities = list(executor.map(retry_canvas_url, universities))
    return updated_universities

def write_to_json(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)
    print(f"Updated data written to {output_file}")

# Load the input JSON data
with open("universities_with_canvas_urls.json") as file:
    universities = json.load(file)

# Retry updating the universities with Canvas URLs if they are null
updated_universities = add_canvas_url_to_universities(universities)

# Write the updated data to JSON
output_file = 'universities_with_canvas_urls_updated.json'
write_to_json(updated_universities, output_file)
