import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = int(os.getenv("PORT", 5050))
    CORS_ORIGIN = os.getenv("CORS_ORIGIN", "*")

    DB_HOST = os.getenv("DB_HOST")
    DB_USER = os.getenv("DB_USER")
    DB_PASS = os.getenv("DB_PASS")
    DB_NAME = os.getenv("DB_NAME")
    DB_PORT = int(os.getenv("DB_PORT", 3306))
    
    JWT_SECRET = os.getenv("JWT_SECRET")
    JWT_EXPIRES_IN = os.getenv("JWT_EXPIRES_IN", "2h")
    api_key=os.getenv("api_key")