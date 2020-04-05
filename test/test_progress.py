import requests
import json
import pprint

def test_new_get_credentials():
    url = 'http://localhost:3000/credentials/1'
    result = requests.get(url)
    pprint.pprint(result.json())

#test_new_get_credentials()

def test_start_route(info):
    url = 'http://localhost:3000/progress/'
    result = requests.post(url, json=info)
    pprint.pprint(result.json())

info = {'user_id': 1,
        'credential_id': 3,
        'trainer': 0,
        'created_by': 0}

test_start_route(info)

def test_update_users_checklist_items(info):
    url = 'http://localhost:3000/progress/'
    result = requests.put(url, json=info)
    pprint.pprint(result.json())

info = {'user_id': 1,
        'checklist_item_id': 6,
        'active': True}

test_update_users_checklist_items(info)


def test_get_user_route_status():
    """Output Format = [{'active': True,
                        'created': '2020-04-02T01:22:43.830Z',
                        'created_by': 0,
                        'credential_id': 2,
                        'finished': True,
                        'id': 3,
                        'started': True,
                        'text': 'B_1_checklist_item',
                        'updated': None,
                        'updated_by': None},
                        {'active': True,
                        'created': '2020-04-02T01:22:43.832Z',
                        'created_by': 0,
                        'credential_id': 2,
                        'finished': False,
                        'id': 4,
                        'started': True,
                        'text': 'B_2_checklist_item',
                        'updated': None,
                        'updated_by': None}]"""

    url = 'http://localhost:3000/progress/start/1&2'
    result = requests.get(url)
    pprint.pprint(result.json())

test_get_user_route_status()

def test_get_user_credential_is_avaiable():
    "{'isAvailable': True, 'msg': 'parent credential exist'}"
    url = 'http://localhost:3000/progress/available/1&2'
    result =requests.get(url)
    pprint.pprint(result.json())

test_get_user_credential_is_avaiable()

def test_get_credential_status_from_checklist_item_angle():
    """{'finishedChecklistNum': 1,
    'isAvailable': True,
    'isChecklistItemsFinished': False,
    'isCompleted': False,
    'isStarted': True,
    'totalChecklistItemNum': 2}"""

    url = 'http://localhost:3000/progress/1&2'
    result = requests.get(url)
    pprint.pprint(result.json())

    url = 'http://localhost:3000/progress/0&1'
    result = requests.get(url)
    pprint.pprint(result.json())

test_get_credential_status_from_checklist_item_angle()

def test_get_credential_status_from_checklist_item_angle_all():
    """[{'finishedChecklistNum': 1,
    'isAvailable': True,
    'isChecklistItemsFinished': False,
    'isCompleted': False,
    'isStarted': True,
    'totalChecklistItemNum': 2}]"""

    url = 'http://localhost:3000/progress/all/0'
    result = requests.get(url)
    pprint.pprint(result.json())

test_get_credential_status_from_checklist_item_angle_all()

def test_get_all_credential_status():
    """[{'finishedChecklistNum': 1,
    'isAvailable': True,
    'isChecklistItemsFinished': False,
    'isCompleted': False,
    'isStarted': True,
    'totalChecklistItemNum': 2}]"""

    url = 'http://localhost:3000/progress/all/'
    result = requests.get(url)
    pprint.pprint(result.json())

test_get_all_credential_status()