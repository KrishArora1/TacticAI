import boto3
import os
from dotenv import load_dotenv

os.makedirs('BackEnd/input', exist_ok=True)
load_dotenv()
s3 = boto3.client('s3', aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'), aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'))
#s3 = boto3.client('s3')
files = s3.list_objects_v2(Bucket = 'tacticaiinternal', Prefix = 'input/')['Contents']

for file in files:
    s3.download_file('tacticaiinternal', file['Key'], os.path.join('BackEnd', file['Key']))
print('downloaded play data')




