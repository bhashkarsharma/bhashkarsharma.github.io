import os
import json
import requests
import conf

TOKEN_URL  = 'https://www.instagram.com/oauth/authorize/?'
TOKEN_URL += 'client_id=' + conf.CLIENT_ID
TOKEN_URL += '&redirect_uri=' + conf.REDIR_URL
TOKEN_URL += '&response_type=token'

CONTENT_URL = 'https://api.instagram.com/v1/users/' + conf.USER_ID + '/media/recent/?access_token=' + conf.ACCESS_TOKEN

resp = requests.get(CONTENT_URL)
if resp.status_code == 200:
    filename = os.path.join(os.path.dirname(__file__), '..', 'assets', 'posts.json')
    with open(filename, 'w') as f:
        f.write(json.dumps(resp.json()))
        f.close()
    print 'Done.'
else:
    print resp.status_code