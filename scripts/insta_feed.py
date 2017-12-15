import os
import json
import requests

# TOKEN_URL  = 'https://www.instagram.com/oauth/authorize/?'
# TOKEN_URL += 'client_id=' + conf.CLIENT_ID
# TOKEN_URL += '&redirect_uri=' + conf.REDIR_URL
# TOKEN_URL += '&response_type=token'

USER_ID = os.environ['INSTA_ID']
ACCESS_TOKEN = os.environ['INSTA_TOKEN']

CONTENT_URL = 'https://api.instagram.com/v1/users/' + USER_ID + '/media/recent/?access_token=' + ACCESS_TOKEN

resp = requests.get(CONTENT_URL)
if resp.status_code == 200:
    filename = os.path.join(os.path.dirname(__file__), '..', 'assets', 'posts.json')
    with open(filename, 'w') as f:
        f.write(json.dumps(resp.json(), indent=4))
        f.close()
    print 'Successfully fetched Instagram posts.'
else:
    print resp.status_code