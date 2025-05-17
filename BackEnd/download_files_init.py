import boto3
import os
from dotenv import load_dotenv

os.makedirs('input', exist_ok=True)
load_dotenv()
s3 = boto3.client('s3', aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'), aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'))
#s3 = boto3.client('s3')
files = s3.list_objects_v2(Bucket = 'tacticaiinternal', Prefix = 'input/nfl-big-data-bowl-2021')['Contents']

for file in files:
    s3.download_file('tacticaiinternal', file['Key'], file['Key'])
print('downloaded play data')




