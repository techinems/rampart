import requests
import json
import pprint

def test_create_credential(info):
    url = 'http://localhost:3000/credentials/'
    #headers = {'content-type': 'application/json'}
    # Should be success
    result = requests.post(url, json=info)
    pprint.pprint(result.json())

info_A = {
        "name" : "credential_A",
        "abbr" : "cred_A",
        "major_cred" : True,
        "parent_cred" : 0,
        "created_by" : 0
}

info_B = {
    "name" : "credential_B",
    "abbr" : "cred_B",
    "major_cred" : True,
    "parent_cred" : 0,
    "created_by" : 0
}

# Success
test_create_credential(info_A)
# Failure
test_create_credential(info_A)
# Success
test_create_credential(info_B)



#test create user credential
def test_create_user_credential(info):

    url = 'http://localhost:3000/credentials/user/'
    result = requests.post(url, json=info)
    pprint.pprint(result.json())

info_A = {
    "user_id" : 2,
    "credential_id" : 1,
    "created_by" : 0
}

info_B = {
    "user_id" : 2,
    "credential_id" : 3,
    "created_by" : 0
}

test_create_user_credential(info_A)
test_create_user_credential(info_A)
test_create_user_credential(info_B)

# Test ChecklistItems

def test_create_checklist_items(info):
    url = 'http://localhost:3000/credentials/checklistItems/'
    result = requests.post(url, json=info)
    pprint.pprint(result.json())

info_A_1 = {
    "credential_id" : 1,
    "text": "credential_A_checklist_1",
    "created_by" : 0
}

info_A_2 = {
    "credential_id" : 1,
    "text": "credential_A_checklist_2",
    "created_by" : 0
}

info_B_1 = {
    "credential_id" : 3,
    "text": "credential_B_checklist_1",
    "created_by" : 0
}

info_B_2 = {
    "credential_id" : 2,
    "text": "credential_B_checklist_2",
    "created_by" : 0
}

test_create_checklist_items(info_A_1)
test_create_checklist_items(info_A_2)
test_create_checklist_items(info_B_1)
test_create_checklist_items(info_B_2)


def test_get_all_credentials():
    url = "http://localhost:3000/credentials/"
    result = requests.get(url)
    pprint.pprint(result.json())

test_get_all_credentials()


def test_get_user_credentials():
    url = "http://localhost:3000/credentials/2"
    result = requests.get(url)
    pprint.pprint(result.json())

def test_update_credentials(info):
    url = "http://localhost:3000/credentials/"
    result = requests.put(url, json=info)
    pprint.pprint(result.json())

info_1_A = {'credential_id': 1,
            'name': 'credential_A_update'}

test_update_credentials(info_1_A)


def test_update_users_credentials(info):
    url = "http://localhost:3000/credentials/user/"
    result = requests.put(url, json=info)
    pprint.pprint(result.json())

info_1_A = {'credential_id': 1,
            'user_id': 2,
            'active': True}

test_update_users_credentials(info_1_A)

test_get_user_credentials()
