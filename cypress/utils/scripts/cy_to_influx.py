import os
import json
import glob
from influxdb_client import InfluxDBClient, Point, WritePrecision, DeleteApi
from influxdb_client.client.write_api import SYNCHRONOUS
from influxdb_client.rest import ApiException
from datetime import datetime, timezone

directory = 'your-directory-to-cypress-report'  #Cypress Report folder

#Measurements related to the last execution
measurement_1 = "last_passed_tests"
measurement_2 = "last_failed_tests"
measurement_3 = "last_time_to_run_tests"

#Measurements related to all executions
measurement_4 = "all_passed_tests"
measurement_5 = "all_failed_tests"
measurement_6 = "all_time_to_run_tests"

#Number of tests 
measurement_7 = "number_of_tests"

#Pass Ratio
measurement_8 = "pass_test_ratio"

#Total executed tests
measurement_9 = "number_of_tests_executed"

#Delta, last two execution time
measurement_10 = "delta_execution_time"

#Last execution, percentage pass ratio
measurement_11 = "last_perc_p_ratio"

#Last execution, percentage pass ratio
measurement_12 = "all_perc_p_ratio"

#All, executed tests per day
measurement_13 = "all_executed_tests_p_day"

#All, time spent with automation
measurement_14 = "all_executed_time"

#Number of execution
measurement_15 = "execution_count"

total_tests = 0
total_pass = 0
total_time = 0
number_of_execution = 0
old_execution_time = 0

#InfluxDB configuration
url = "http://localhost:8086"
token = "your-token"
org = "your-organization"
my_bucket = "cypress"
retention_policy = "30d"

# ---------------------------------------------- #
#          Delete and Create Bucket              #
# ---------------------------------------------- #
def new_bucket():
    create_bucket = True
    client = InfluxDBClient(url=url, token=token, org=org)

    # Check if the bucket already exists
    buckets_api = client.buckets_api()
    existing_buckets = buckets_api.find_buckets().buckets
    for bucket in existing_buckets:
        print(bucket.name)
        if bucket.name == my_bucket:
            print(f"Bucket already exists.")
            create_bucket = False
            break
    if create_bucket:
        client.buckets_api().create_bucket(bucket_name=my_bucket, retention_rules=[{"everySeconds": 86400 * 30}])

# ---------------------------------------------- #
#          Write data into influx DB             #
# ---------------------------------------------- #
def write(measurement, value, time):
    #InfluxDB client
    client = InfluxDBClient(url=url, token=token, org=org)
    timestamp = datetime.fromisoformat(time.replace("Z", "+00:00"))

    #Create a Point with specified timestamp and value
    point = Point(measurement) \
        .time(timestamp, WritePrecision.MS) \
        .field("value", value)

    #Write point to InfluxDB
    try:
        write_api = client.write_api(write_options=SYNCHRONOUS)
        write_api.write(bucket=my_bucket, record=point)

        print(f"Successfully sent value {value} to InfluxDB")
        print(f"Timestamp: {timestamp.isoformat()}, Value: {value}")

    except ApiException as e:
        print(f"Error during write operation: ({e.status})")
        print(f"Reason: {e.reason}")
        if hasattr(e, 'body'):
            print(f"HTTP response body: {e.body}")

    #Close connection
    finally:
        client.close()

# ---------------------------------------------- #
#     Delete all values from a measurement       #
# ---------------------------------------------- #
def drop_measurement(measurement_name):
    #InfluxDB client
    client = InfluxDBClient(url=url, token=token, org=org)

    try:
        #Initialize DeleteApi
        delete_api = DeleteApi(client)
        time = datetime.now(timezone.utc)

        #Delete all the values in measurement
        delete_api.delete('1970-01-01T00:00:00Z', time, org=org, bucket=my_bucket, predicate=f'_measurement="{measurement_name}"')

        print(f"Measurement '{measurement_name}' dropped successfully.")

    except Exception as e:
        print(f"Error dropping measurement '{measurement_name}': {e}")

    #Close connection
    finally:
        client.close()

# ---------------------------------------------- #
#   Get any value from json using its key value  #
# ---------------------------------------------- #
def get_value_from_json(json_file, key):
    with open(json_file, 'r') as file:
        data = json.load(file)
    stats = data.get('stats', {})
    key_value = stats.get(key, f'{key}')
    return key_value

# ---------------------------------------------- #
#    Find all index.json in a given folder       #
# ---------------------------------------------- #
def find_cypress_json_files(directory):
    return glob.glob(os.path.join(directory, '**', 'index.json'), recursive=True)

############################################################################
############################################################################
############################################################################
#######################      SCRIPT       ##################################
############################################################################
############################################################################
############################################################################

#Create new Bucket
new_bucket()

#Drop all measurements
measurements = [measurement_1, measurement_2, measurement_3, measurement_4, measurement_5, measurement_6, measurement_7, measurement_8, measurement_9, measurement_10, measurement_11, measurement_12, measurement_13, measurement_14, measurement_15]
for measurement in measurements:
    drop_measurement(measurement)

#Finding all index.json files
output_json_files = find_cypress_json_files(directory)
for json_file in output_json_files:
    value = get_value_from_json(json_file, "tests")
    if number_of_execution > 1:
        old_execution_time = total_time_spent
    total_time_spent = get_value_from_json(json_file, 'duration')
    test_run_date = get_value_from_json(json_file, 'start')[0:10]
    print("----------")
    print(json_file)
    print(f"Total time spent to run all tests: {total_time_spent}")
    print(f"Test run date: {test_run_date}")
    passed = get_value_from_json(json_file, 'passes')
    failed = get_value_from_json(json_file, 'failures')

    test_run_datetime = datetime.strptime(test_run_date, "%Y-%m-%d").date()
    start_time = get_value_from_json(json_file, 'start')

    #Variable to calculate the retention
    timestamp = datetime.today().date()

    days_diff = (timestamp - test_run_datetime).days
    if days_diff < 30 and total_time_spent > 0:
        number_of_execution = number_of_execution + 1
        print(total_pass)
        passed = get_value_from_json(json_file, 'passes')
        failed = get_value_from_json(json_file, 'failures')
        write(measurement_4, passed, start_time)
        write(measurement_5, failed, start_time)
        print(f"Total time spend in seconds: {total_time_spent}")
        write(measurement_6, total_time_spent, start_time)
        total_tests = total_tests + passed + failed
        total_pass = total_pass + passed
        total_time = total_time + total_time_spent
        write(measurement_9, total_tests, start_time)
        pass_ratio_overtime = total_pass / total_tests
        write(measurement_12, pass_ratio_overtime, start_time)
        write(measurement_13, total_tests, start_time)
        print(total_pass)
    else:
        print("Old test: Wll not be considered due to influxdb Retention")

#Set the last test passed, failed and duration
write(measurement_1, passed, start_time)
write(measurement_2, failed, start_time)
write(measurement_3, total_time_spent, start_time)

#Total number of tests
print(f"The total number of tests is: {total_tests}")
write(measurement_7, total_tests, start_time)


#Delta time last two execution
if number_of_execution > 1:
    #Pass ratio
    pass_ratio = total_pass / total_tests
    print(f"The pass ratio is: {pass_ratio}")
    write(measurement_8, pass_ratio, start_time)

    delta = total_time_spent / old_execution_time
    write(measurement_10, delta, start_time)
    #Last Pass ratio
    pass_ratio_last = passed  / (passed + failed)
    write(measurement_11, pass_ratio_last, start_time)

    #Total time spent running tests during the retention period
    write(measurement_14, total_time, start_time)

    #Number of executions
    write(measurement_15, number_of_execution, start_time)