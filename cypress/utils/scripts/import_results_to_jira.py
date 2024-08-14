import requests
import json
import os
from datetime import datetime
from requests.auth import HTTPBasicAuth

##### POPULATE THE VARIABLE TODAY, TO GET THE OUTPUT JSON #####
current_date = datetime.now()
today = current_date.strftime('%Y-%m-%d')

##### JIRA PROJECT VARIABLE #####
project_key = "your-project"
test_plan_key = "your-test-plan"

##### JIRA VARIABLES #####
JIRA = 'your-domain'
USER = 'your-email'
API_TOKEN = 'your-token'

##### XRAY VARIABLES #####
client_id = "your-client-id"
client_secret = "your-client-secret"

##### FILE PATHS JSON #####
file_path = f"C:/Users/Gabriel/Desktop/CY-ORANGE/ORANGE-HRM-PT2-CY/cypress/reports/{today}/mocha"

data = {
    "info": {
        "project": f"{project_key}",
        "summary": f"Automatic: Cypress Test Execution at {today}",
        "description": f"This execution is related to the project {project_key}, and realized at {today}",
        "testPlanKey": f"{test_plan_key}"
    },
    "tests": []
}

# ---------------------------------------------- #
#    AUTHENTICATE INTO XRAY, AND RETURN TOKEN    #
# ---------------------------------------------- #
def authenticate(client_id, client_secret):
    url = "https://xray.cloud.getxray.app/api/v2/authenticate"
    payload = json.dumps({
        "client_id": client_id,
        "client_secret": client_secret
    })
    headers = {
        "Content-Type": "application/json"
    }
    response = requests.post(url, headers=headers, data=payload)
    if response.status_code == 200:
        print("Authentication successful")
        return response.text.strip('"')
    else:
        raise Exception(f"Authentication failed: {response.text}")

# ---------------------------------------------- #
#             IMPORT JSON INTO XRAY              #
# ---------------------------------------------- #
def import_json(token, file_path):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}"
    }
    with open(file_path, 'rb') as file:
        data = file.read()

    url = f"https://xray.cloud.getxray.app/api/v2/import/execution"
    response = requests.post(url, headers=headers, data=data)

    if response.status_code == 200:
        print("The import was succesfull!")
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        
# ---------------------------------------------- #
# GET TEST ID IN JIRA - SEARCH USING A JQL QUERY #
# ---------------------------------------------- #
def get_test_id_in_jira(test_name):
    search_for_test_url = f'https://{JIRA}/rest/api/2/search'

    jql = f'project = OTS AND summary ~ "\\"{test_name}\\"" AND summary ~ "CY"'

    auth = HTTPBasicAuth(USER, API_TOKEN)
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    params = {
        'jql': jql,
        'maxResults': 1,
        'fields': 'key'
    }

    response = requests.get(search_for_test_url, headers=headers, params=params, auth=auth)

    if response.status_code == 200:
        data = response.json()
        if  len(data['issues']) > 0:
            test_id = data['issues'][0]['key']
            print(f"Test ID found: {test_id}")
            return   test_id
        else:
            print('No test issues found.')
            raise KeyError(f"Error: Check you XML file and Jira. If it is necessary, run update_tests_to_jira. It is mandatory the test existence in jira before import the results.")
    else:
        print(f'Failed to Retrieve Data')
        print(f'Response: {response.text}')

# ---------------------------------------------- #
#         POPULATE THE IMPORT JSON FILE          #
# ---------------------------------------------- #
def write_into_json(testKey, status):
    json_to_import = os.path.join(file_path, "import.json")
    test_case = {
        "testKey": f"{testKey}",
        "status": f"{status}"
    }
    with open(json_to_import, 'w') as file:
        json.dump(data, file, indent=4)
    data["tests"].append(test_case)
    
# ---------------------------------------------- #
#   CHECK THE OUTPUT JSON AND MATCHES WITH JIRA  #
# ---------------------------------------------- #
def is_test_passed(file_path):
    json_file_path = os.path.join(file_path, "index.json")
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    
    for result in data.get('results', []):
        for suite in result.get('suites', []):
            for test in suite.get('tests', []):
                if '[CY]' in test.get('title', ''):
                    test_name = test.get('title').replace('[CY]', '').strip()
                    id = get_test_id_in_jira(test_name)
                    if test.get('pass') == True:
                        write_into_json(id, "PASSED")
                        print(f'{test_name}: Passed')
                    if test.get('fail') == True:
                        write_into_json(id, "FAILED")
                        print(f'{test_name}: Failed')
                else:
                    print('----------------------------------')
                    print(test.get('title'))
                    print('Test is not ready to be imported. Does not contain the automation label [CY]!')
                    print('----------------------------------')

is_test_passed(file_path)
# token = authenticate(client_id, client_secret)
# import_json(token, file_path)
write_into_json("last_execution", "FINAL")