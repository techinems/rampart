import requests
import json
import pprint


def test_create_permission(info):
    url = 'http://localhost:3000/permissions/'
    result = requests.post(url, info)
    pprint.pprint(result.json())

info = {'name': 'per_1',
        'abbr': 'P1',
        'description': "Permission One",
        'created_by': 0}

test_create_permission(info)

info = {'name': 'per_2',
        'abbr': 'P2',
        'description': "Permission Two",
        'created_by': 0}

test_create_permission(info)

info = {'name': 'mission_3',
        'abbr': 'M3',
        'description': "Permission Three",
        'created_by': 0}

test_create_permission(info)

def test_update_permission(info):
    url = 'http://localhost:3000/permissions/'
    result = requests.put(url, info)
    pprint.pprint(result.json())

info = {'permission_id': 2,
        'abbr': 'P2',
        'description': "Permission Two Update",
        'created_by': 0}

test_update_permission(info)

def test_create_user_permission(info):
    url = 'http://localhost:3000/permissions/user/'
    result = requests.post(url, info)
    pprint.pprint(result.json())


info = {'user_id': 1,
        'permission_id': 1,
        'created_by': 0}

test_create_user_permission(info)

info = {'user_id': 1,
        'permission_id': 2,
        'created_by': 0}

test_create_user_permission(info)

info = {'user_id': 1,
        'permission_id': 3,
        'created_by': 0}

test_create_user_permission(info)


def test_update_user_permission(info):
    url = 'http://localhost:3000/permissions/user/'
    result = requests.put(url, info)
    pprint.pprint(result.json())


info = {'user_id': 1,
        'permission_id': 1,
        'active': False}

test_update_user_permission(info)
test_update_user_permission(info)


def test_get_permissions(info=None):
    url = 'http://localhost:3000/permissions/mission'

    result = requests.get(url)
    pprint.pprint(result.json())

#test_get_permissions()
test_get_permissions()

def test_get_user_permissions(info=None):
    url = 'http://localhost:3000/permissions/all/1'

    result = requests.get(url)
    pprint.pprint(result.json())

#test_get_permissions()
test_get_user_permissions()



