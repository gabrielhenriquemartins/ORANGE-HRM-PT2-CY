#!/bin/bash

python3 /cypress/cypress/utils/scripts/documentation.py
cd /cypress/cypress/documentation/library

npm start