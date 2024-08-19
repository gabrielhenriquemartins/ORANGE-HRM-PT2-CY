import re
import os
import glob
import shutil
import json
import sys

directory_project = 'your-directory'

# ---------------------------------------------- #
#            Get values from command line        #
# ---------------------------------------------- #
def get_values_in_command_line():
    global directory_project
    if len(sys.argv) == 2:
        directory_project = sys.argv[1]
        print(f'Project directory: {directory_project}')
    else:
        print("Not enough arguments provided.")

def delete_and_create_new_folder(folder):
    if os.path.exists(folder):
        shutil.rmtree(folder)
        print(f"Removed folder: {folder}")

    os.makedirs(folder, exist_ok=True)
    print(f"Created new folder: {folder}")

def create_json_file(file_name, index):
    output_json = os.path.join(directory_project, f"documentation/library/docs/{file_name}/_category_.json")

    # Creation of category json
    with open(output_json, 'w') as file:
        json_data = {
            "label": file_name,
            "position": index,
            "link": {
                "type": "generated-index",
                "description": f"Library documentation for '{file_name}'"
            }
        }
        json_string = json.dumps(json_data, indent=4)
        file.write(json_string)
        print(f"Json file created for {file_name}")

def find_all_files_and_create_the_documentation(directory, i = 2, custom_commands = False):
    if(custom_commands):
        # Library creation custom commands (Home Page)
        js_file = os.path.join(directory, 'support/commands.js')
        output_dir = os.path.join(directory, f"documentation/library/docs/customComands")
        delete_and_create_new_folder(output_dir)
        create_json_file('customComands', i)
        create_documentation(js_file, 'customComands')
        find_all_files_and_create_the_documentation(directory, i = 3)
    else:
        directory_js_scripts = os.path.join(directory, 'resources/page_objects')
        js_files = glob.glob(os.path.join(directory_js_scripts, '**', '*.js'), recursive=True)

        # For loop to create the path in all files found
        for index_file, js_file in enumerate(js_files):
            base_name = os.path.splitext(os.path.basename(js_file))[0]
            output_dir = os.path.join(directory, f"documentation/library/docs/{base_name}")

            delete_and_create_new_folder(output_dir)
            create_json_file(base_name, index_file + i)

            # Library creation
            create_documentation(js_file, base_name)

def remove_asteriscs(section):
            lines = section.splitlines()
            cleaned_lines = [line.strip('* ').strip() for line in lines]
            return '\n'.join(cleaned_lines).strip()

def create_documentation(input_file, output_file):

    output_folder = os.path.join(directory_project, f"documentation/library/docs/{output_file}")

    # Regex to identify the pattern
    header_pattern = re.compile(r"""
        \s*/\*\*\s*        
        \*\s*Command:\s*(.*?)\s*   
        \*\s*Author:\s*(.*?)   
        \*\s*Description:\s*(.*?)  
        (?:\*\s*Usage:\s*(.*?)\s*)?
        (?:\*\s*Parameters:\s*(.*?)\s*)?
        \*\s*Example:\s*(.*?)
        \*/\s*
    """, re.DOTALL | re.VERBOSE)
    
    with open(input_file, 'r') as file:
        content = file.read()

    matches = []
    matches = header_pattern.finditer(content)

    for index, match in enumerate(matches):
        doc_name = match.group(1).strip().replace('*', '').strip()[1:-1]
        doc_output = os.path.join(output_folder, doc_name + '.md')

        with open(doc_output, 'w') as file:
            author = remove_asteriscs(match.group(2).strip())
            description = remove_asteriscs(match.group(3).strip())
            usage = remove_asteriscs(match.group(4).strip()) if match.group(4) else 'No usage information provided.'
            parameters = remove_asteriscs(match.group(5).strip()) if match.group(5) else 'No parameters provided.'
            example = remove_asteriscs(match.group(6).strip())

            # Populate md files
            file.write("---\n" + "sidebar_position: " + str(index+1) + "\n---\n\n")
            file.write(f"# `{doc_name}`\n\n")
            file.write(f"This is the documentation page of the command '{doc_name}'. This document was written by **{author}**.\n\n")
            file.write(f"## Description:\n\n{description}\n\n")
            if usage != 'No usage information provided.':
                file.write(f"## Usage:\n\n```js\n{usage}\n```\n\n")
            if parameters != 'No parameters provided.':
                file.write(f"## Parameters:\n\n{parameters}\n\n")
            file.write(f"## Example:\n\n```js\n{example}\n```")


get_values_in_command_line()
find_all_files_and_create_the_documentation(directory_project, custom_commands=True)