import csv
import json



def filter_us_universities(csv_file):
    # Initialize an empty list to store filtered universities
    us_universities = []

    # Read the CSV file
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        
        for row in reader:
            country_code = row[0].strip()  # Extract country code from the first column
            university_name = row[1].strip()  # Extract university name from the second column
            domain = row[2].strip()  # Extract domain from the third column
            
            # Check if the country code is 'US'
            if country_code == 'US':
                us_universities.append({"name": university_name, "domain": domain})
    
    return us_universities



def write_to_json(data, output_file):
    # Write the filtered data to a JSON file
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4)
    print(f"Filtered data written to {output_file}")

# File paths
world_universities_file = './world-universities.csv'  # Path to your CSV file of world universities and domains
output_json_file = 'us_universities_with_domains.json'  # Output JSON file

# Filter input files
us_universities = filter_us_universities(world_universities_file)

# Write the filtered data to JSON
write_to_json(us_universities, output_json_file)
