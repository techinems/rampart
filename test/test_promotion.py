import requests
import json
import pprint

def test_create_promotion_request(info):
    url = 'http://localhost:3000/promotions/'
    result = requests.post(url, info)
    pprint.pprint(result.json())

info = {'user_id': 1,
        'credential_id': 1,
        'created_by': 0}
test_create_promotion_request(info)

def test_update_promotion_request(info):
    url = 'http://localhost:3000/promotions/'
    result = requests.put(url, info)
    pprint.pprint(result.json())

info = {'promo_request_id': 1,
        'active': True}
test_update_promotion_request(info)


def test_create_promotion_request_vote(info):
    url = 'http://localhost:3000/promotions/vote/'
    result = requests.post(url, info)
    pprint.pprint(result.json())

info = {'promo_request_id': 1,
        'user_id': 0,
        'created_by': 0}
test_create_promotion_request_vote(info)

info = {'promo_request_id': 1,
        'user_id': 1,
        'created_by': 1}

test_create_promotion_request_vote(info)


def test_update_promotion_request_vote(info):
    url = 'http://localhost:3000/promotions/vote/'
    result = requests.put(url, info)
    pprint.pprint(result.json())

info = {'promo_request_id': 1,
        'user_id': 0,
        'comments': 'After Update',
        'vote': True}
test_update_promotion_request_vote(info)

info = {'promo_request_id': 1,
        'user_id': 1,
        'comments': 'BBBB',
        'vote': False}
test_update_promotion_request_vote(info)

def test_get_a_promotion_votes_result():
    """
    {'active': True,
    'approved': True,
    'comments': None,
    'created': '2020-04-02T04:40:07.526Z',
    'created_by': 0,
    'credentialName': 'Credential_A',
    'credential_id': 1,
    'date': '2020-04-02',
    'denies': 1,
    'detail': [{'comments': 'After Update', 'user_id': 0, 'vote': True},
                {'comments': 'BBBB', 'user_id': 1, 'vote': False}],
    'id': 1,
    'total': 2,
    'updated': '2020-04-02T05:37:51.615Z',
    'updated_by': None,
    'user_id': 1,
    'votes': 1}
    """
    url = 'http://localhost:3000/promotions/1'
    result = requests.get(url)
    pprint.pprint(result.json())

test_get_a_promotion_votes_result()


def test_get_promotion_requests_result():
    """Output Format
    [{'active': True,
        'approved': True,
        'comments': None,
        'created': '2020-04-02T04:40:07.526Z',
        'created_by': 0,
        'credential_id': 1,
        'date': '2020-04-02',
        'id': 1,
        'updated': '2020-04-02T05:37:51.615Z',
        'updated_by': None,
        'user_id': 1}]
    """
    url = 'http://localhost:3000/promotions/'
    result = requests.get(url)
    pprint.pprint(result.json())

test_get_promotion_requests_result()


