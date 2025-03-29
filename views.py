from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google.auth.transport import requests
from google.oauth2 import id_token
import requests
import json

GOOGLE_CLIENT_ID = "YOUR_CLIENT_ID"
GOOGLE_CLIENT_SECRET = "YOUR_CLIENT_SECRET"
REDIRECT_URI = "YOUR_REDIRECT_URI"

@csrf_exempt
def google_login(request):
    if request.method == "POST":
        data = json.loads(request.body)
        id_token_received = data.get("idToken")

        try:
            # Verify ID Token
            decoded_token = id_token.verify_oauth2_token(id_token_received, requests.Request(), GOOGLE_CLIENT_ID)
            user_email = decoded_token["email"]

            # Exchange ID token for an access token
            token_response = requests.post(
                "https://oauth2.googleapis.com/token",
                data={
                    "client_id": GOOGLE_CLIENT_ID,
                    "client_secret": GOOGLE_CLIENT_SECRET,
                    "grant_type": "authorization_code",
                    "redirect_uri": REDIRECT_URI,
                    "code": id_token_received,
                },
            ).json()

            return JsonResponse({"googleAccessToken": token_response.get("access_token")})

        except Exception as e:
            return JsonResponse({"error": str(e)})

