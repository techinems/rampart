import requests
import json
import pprint

url = 'http://localhost:3000/users/'
#headers = {'content-type': 'application/json'}
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


print("======= Get user 1 =====")
url = 'http://localhost:3000/users/0'
users = requests.get(url)
print("HERE")
pprint.pprint(users.json())
print('======= get user 1 =======')

url = 'http://localhost:3000/users/'
#headers = {'content-type': 'application/json'}

users = requests.get(url).json()
pprint.pprint(users)


print('test_put')
url = 'http://localhost:3000/users/'
info_updated = {
    "first_name" : "First_Updated",
    "last_name" : "Last_Updated",
    "dob" : "2020-01-03",
    "id": int(users[1]['id'])
}
result = requests.put(url, json=info_updated)
pprint.pprint(result.json())


s = requests.session()

url = 'http://localhost:3000/users/sessions/'
#header = {'content-type': 'application/json'}
from_data_1 = {
    "email" : "foo.bar@bar.foo",
    "password" : "1234567890"
}
result = s.post(url, data = from_data_1)
pprint.pprint(result.json())

from_data_2 = {
    "email" : "foo.bar@bar.foo",
    "password" : "1234567"
}

result = s.post(url, data = from_data_2)
pprint.pprint(result.json())