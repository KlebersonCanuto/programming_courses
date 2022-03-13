import subprocess
import json

def lambda_handler(event, context):
    path = "/tmp/myfile.pý"
    code = event["code"]
    
    input = event.get("input")
    
    if "importos" in code.replace(" ", "").replace("\t", ""):
        return {
            'statusCode': 403
        }
    
    f = open(path, "w")
    f.write(code)
    f.close()

    pcs = subprocess.run(["python3", path], input=input, text="true", capture_output=True)
    
    if pcs.returncode == 1:
        return {
            'statusCode': 400,
            'message': pcs.stderr
        }
    
    return {
        'statusCode': 200,
        'body': pcs.stdout
    }
