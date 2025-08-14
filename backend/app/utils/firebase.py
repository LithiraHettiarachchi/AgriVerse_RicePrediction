import os
from typing import Optional
import firebase_admin
from firebase_admin import credentials, firestore, auth

FIREBASE_JSON_FILENAME = "agriverse-bcdea-firebase-adminsdk-fbsvc-f6cbc786f0.json"


def find_firebase_json() -> str:
    """Search for the Firebase JSON file in possible locations."""
    current_dir = os.path.dirname(__file__)
    possible_paths = [
        os.path.join(current_dir, FIREBASE_JSON_FILENAME),
        os.path.join(current_dir, "..", FIREBASE_JSON_FILENAME),
        os.path.join(current_dir, "..", "..", FIREBASE_JSON_FILENAME),
    ]

    for path in possible_paths:
        if os.path.isfile(path):
            return os.path.abspath(path)

    raise FileNotFoundError(
        f"Firebase JSON file not found. Checked these locations:\n" +
        "\n".join(possible_paths)
    )


def initialize_firebase() -> firestore.Client:
    """Initialize Firebase app and return Firestore client."""
    if not firebase_admin._apps:
        json_path = find_firebase_json()
        cred = credentials.Certificate(json_path)
        firebase_admin.initialize_app(cred)
    return firestore.client()


# Initialize Firestore
db = initialize_firebase()


def verify_token(id_token: str) -> Optional[dict]:
    """Verify Firebase ID token and return decoded token if valid."""
    try:
        return auth.verify_id_token(id_token)
    except Exception as e:
        print(f"Token verification error: {e}")
        return None

