import requests
import json
import pprint

url = 'http://localhost:3000/users/'
headers = {'content-type': 'application/json'}

result = requests.get(url)
pprint.pprint(result.json())
