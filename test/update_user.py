import requests
import json
import pprint

url = 'http://express_backend:3000/users/'
headers = {'content-type': 'application/json'}
info = {
    "id" : "1"
    "first_name" : "First_updated",
    "last_name" : "Last_updated",
}

result = requests.put(url,json=info)
pprint.pprint(result.json())