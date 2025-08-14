import firebase_admin
from firebase_admin import credentials, auth, firestore

# Path to your Firebase service account JSON file
cred = credentials.Certificate("agriverse-bcdea-firebase-adminsdk-fbsvc-e8f5351915.json")

# Initialize Firebase app if not already initialized
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

def verify_token(id_token: str):
    """Verify Firebase ID token and return decoded data"""
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token
    except Exception as e:
        print("Token verification error:", e)
        return None
