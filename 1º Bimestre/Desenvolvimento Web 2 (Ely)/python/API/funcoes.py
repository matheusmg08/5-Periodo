import jwt
from flask import jsonify
from flask import request, current_app

def valida_token(token):
    try:
        if not token or not token.startswith("Bearer "):
            return False
        else:
            dados = jwt.decode(token.split(" ")[1], current_app.config.get("SECRET_KEY"), algorithms=["HS256"])
            return True
        
    except jwt.ExpiredSignatureError:
        return False