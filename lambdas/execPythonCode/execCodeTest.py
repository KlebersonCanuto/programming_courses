from execCode import lambda_handler

res = lambda_handler({
    "code": "print(\"Hello World!\")", 
    "input": "Hello World!"
}, None)

assert(res['statusCode'] == 200)
assert(res['body'] == "Hello World!\n")

res = lambda_handler({
    "code": "import os\n", 
    "input": ""
}, None)

assert(res['statusCode'] == 403)

res = lambda_handler({
    "code": "x = int(input())", 
    "input": "n"
}, None)

assert("invalid literal" in res['message'])
assert(res['statusCode'] == 400)

res = lambda_handler({
    "code": "x = int(input())", 
    "input": ""
}, None)

assert("EOF when reading a line" in res['message'])
assert(res['statusCode'] == 400)

res = lambda_handler({
    "code": "x = int(input())\nprint(x + 1)", 
    "input": "5"
}, None)

assert(res['statusCode'] == 200)
assert(res['body'] == "6\n")