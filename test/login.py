import requests
import json
import pprint

url = 'http://express_backend:3000/users/session'
headers = {'content-type': 'application/json'}
from_data = {
    "email" : "foo.bar@bar.foo",
    "password" : "1234567890"
}
s = requests.session()
response = s.post(url, data = from_data, headers = header)
print response.status_code