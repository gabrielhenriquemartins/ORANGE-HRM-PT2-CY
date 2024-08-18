import requests
from requests.auth import HTTPBasicAuth
import json
import sys
import os
import re

##### JIRA PROJECT VARIABLE #####
project_key = 'your-project-key'
test_plan = 'your-test-plan'
description = 'Generic Description! Please, input here the test step ...'
comment_new = 'Test Created!' 
comment_update = 'Automated Tests Updated! Another test with the same name was identified!' 

##### JIRA VARIABLES #####
JIRA = 'your-domain'
API_TOKEN = 'your-api-token'
USER = 'your-user'

##### CYPRESS FOLDER #####
file_path = "your-path-to-test-folder"

# ---------------------------------------------- #
#            Get values from command line        #
# ---------------------------------------------- #
def get_values_in_command_line():
    if len(sys.argv) == 7:
        project_key = sys.argv[1]
        print(f'Project Key: {project_key}')
        test_plan = sys.argv[2]
        print(f'Test Plan: {test_plan}')
        JIRA = sys.argv[3]
        print(f'Jira Domain: {JIRA}')
        API_TOKEN = sys.argv[4]
        print(f'Jira API Token: {API_TOKEN}')
        USER = sys.argv[5]
        print(f'Jira User E-mail: {USER}')
        path_cypress = sys.argv[6]
        print(f'Cypress Path: {path_cypress}')
    else:
        print("Not enough arguments provided.")

# ---------------------------------------------- #
#            Add Comments to an Issue            #
# ---------------------------------------------- #
def update_comments(TEST, COMMENT):
    url = f'https://{JIRA}/rest/api/2/issue/{TEST}/comment'
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    auth = HTTPBasicAuth(USER, API_TOKEN)
    data = {
        "body": COMMENT
    }
    response = requests.post(url, headers=headers, data=json.dumps(data), auth=auth)
    if response.status_code == 201:
        print('Comment added!')
    else:
        print(f'Failed to add comment.')
        print(f'Response: {response.text}')

# ---------------------------------------------- #
#     CREATE A TEST ISSUE, AND RETURN ID         #
# ---------------------------------------------- #
def create_test_and_return_id(project_key, TEST_NAME):
    create_test_url = f'https://{JIRA}/rest/api/2/issue'
    search_for_test_url = f'https://{JIRA}/rest/api/2/search'

    auth = HTTPBasicAuth(USER, API_TOKEN)
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    
    jql = f'project = {project_key} AND summary ~ "\\"{TEST_NAME}\\"" AND summary ~ "CY" AND issuetype = Test'
    params = {
        'jql': jql,
        'fields': 'key'
    }

    response = requests.get(search_for_test_url, headers=headers, params=params, auth=auth)

    if response.status_code == 200:
        data = response.json()
        if len(data['issues']) == 0:
            data = {
                "fields": {
                    "project": {
                        "key": project_key
                    },
                    "summary": f'[CY] {TEST_NAME}',
                    "description": description,
                    "issuetype": {
                        "name": "Test"
                    },                    
                }
            }

            response = requests.post(create_test_url, headers=headers, data=json.dumps(data), auth=auth)

            if response.status_code == 201:
                created_test = response.json()['key']
                print(f'Created Test: {created_test}')
                update_comments(created_test, comment_new)
                id = get_last_issue_id()
                return   id
            else:
                print(f'Failed to create issue.')
                print(f'Response: {response.text}')
        else:
            print('Test already exists.')
            for test in data['issues']:
                print('*********** DUPLICATED TESTs ***********')
                print(f'Existing Issue Key: {test["key"]}')
                print('****************************************')
                update_comments(test["key"], comment_update)
    else:
        print(f'Failed to search!!!')
        print(f'Response: {response.text}')

# ---------------------------------------------- #
#             GET LAST ISSUE ID                  #
# ---------------------------------------------- #
def get_last_issue_id():
    search_for_test_url = f'https://{JIRA}/rest/api/2/search'

    # JQL query to get the latest test
    jql = f'project = {project_key} AND issuetype = Test ORDER BY created DESC'
    max_results = 1

    auth = HTTPBasicAuth(USER, API_TOKEN)
    headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    params = {
        'jql': jql,
        'maxResults': max_results,
        'fields': 'key'
    }

    response = requests.get(search_for_test_url, headers=headers, params=params, auth=auth)

    if response.status_code == 200:
        data = response.json()
        if 'issues' in data and len(data['issues']) > 0:
            last_test_id = data['issues'][0]['key']
#            print(f'The last test ID is: {last_test_id}')
            id = get_id_number(last_test_id)
            return   id
        else:
            print('No test issues found.')
    else:
        print(f'Failed to retrieve tests.')
        print(f'Response: {response.text}')

# ---------------------------------------------- #
# Find a text in files and Return Test Case Name #
# ---------------------------------------------- #
def find_texts_in_files(path_cypress):
    results = []
    previous_line = None
    for root, dirs, files in os.walk(path_cypress):
        for file_name in files:
            if file_name.endswith('.js'):
                file_path = os.path.join(root, file_name)
                with open(file_path, 'r', encoding='utf-8') as file:
                    for line in file:
                        if 'OTS-XXX' in line:
                            if previous_line:
                                test_name = process_string(previous_line.strip())
                                print(test_name)
                                results.append(test_name)
                        previous_line = line
    return results

def process_string(input_string):
    first = input_string.find("'")
    second = input_string.find("'", first + 1)
    if first != -1 and second != -1:
        new_string = input_string[first + 1:second]
    else:
        raise KeyError("The input string does not contain exactly two single quotes.")
    return new_string

# ---------------------------------------------- #
#     Get Jira Issue ID and convert to a number  #
# ---------------------------------------------- #
def get_id_number(text):
    pattern = r'OTS-(\d+)'
    match = re.search(pattern, text)
    if match:
        return match.group(1)
    else:
        return None

# --------------------------------------------------- #
# Rename all Test Cases with the matching condictions #
# --------------------------------------------------- #
def find_and_replace(TEST_NUMBER, TEST_NAME):
    control_variavel = 0
    if TEST_NUMBER != None:
        for root, dirs, files in os.walk(path_cypress):
            for file_name in files:
                if file_name.endswith('.js'):
                    file_path = os.path.join(root, file_name)
                    modified_lines = []
                    with open(file_path, 'r', encoding='utf-8') as file:
                        for index, line in enumerate(file):
                            if control_variavel == 1:
                                modified_line = line.replace('OTS-XXX', f'OTS-{TEST_NUMBER}')
                                modified_lines.append(modified_line)
                                control_variavel = 0
                            else:
                                if TEST_NAME in line:
                                    modified_line = line.replace(TEST_NAME, f'[CY] {TEST_NAME}')
                                    modified_lines.append(modified_line)
                                    control_variavel = 1
                                else:
                                    modified_lines.append(line)
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.writelines(modified_lines)
    else:
        print(f'Please, check the Test Suit: {TEST_NAME}')
        print("****************************************")

# --------------------------------------------------- #
#           Associate Test to a Test Plan             #
# --------------------------------------------------- #
def associate_test_to_a_test_plan(test_plan, TEST):
    url = f'https://{JIRA}/rest/api/2/issueLink'
    link_type = 'Test'
    headers = {
        'Content-Type': 'application/json'
    }
    auth = HTTPBasicAuth(USER, API_TOKEN)
    payload = {
        "type": {
            "name": link_type
        },
        "inwardIssue": {
            "key": TEST
        },
        "outwardIssue": {
            "key": test_plan
        }
    }
    response = requests.post(url, headers=headers, auth=auth, data=json.dumps(payload))
    if response.status_code == 201:
        print('Linked to a test Plan!')
    else:
        print(f'Failed to link')
        print(f'Response: {response.text}')

get_values_in_command_line()
tests_to_create = find_texts_in_files(path_cypress)
if len(tests_to_create) == 0:
    print("No new tests were found, nothing will be created in Jira!")
else:
    for tests in tests_to_create:
        print(f'CREATE TEST - {tests}')
        id = create_test_and_return_id(project_key, tests)
        associate_test_to_a_test_plan(test_plan, f'{project_key}-{id}')
        find_and_replace(id, tests)