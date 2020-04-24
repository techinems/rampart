import requests
import json
import pprint

url = 'http://localhost:3000/users/'
headers = {'content-type': 'application/json'}
info = {
    "first_name" : "First",
    "last_name" : "Last",
    "password" : "1234567",
    "phone" : "1234567890",
    "email" : "foo.bar@bar.foo",
    "dob" : "2020-01-02"
}

result = requests.post(url,json=info)
pprint.pprint(result.json())
