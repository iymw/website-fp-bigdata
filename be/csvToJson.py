import csv
import json

# Open the CSV file with a specified encoding
with open('amazon.csv', mode='r', encoding='ISO-8859-1') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    data = [row for row in csv_reader]

# Convert the list of dictionaries to JSON format and write to a file
with open('amazon.json', mode='w') as json_file:
    json.dump(data, json_file, indent=4)

print("CSV file successfully converted to JSON.")