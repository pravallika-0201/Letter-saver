import React, { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import LetterEditor from "./components/LetterEditor";
import GoogleDriveIntegration from "./components/GoogleDriveIntegration";

const clientId = "73822207260-13dgkpa7n2ir219jejsp2hldir5eprla.apps.googleusercontent.com"; // Replace with your actual Client ID



const App = () => {
  const [user, setUser] = useState(null);
  const [googleAccessToken, setGoogleAccessToken] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    localStorage.setItem("authToken", token); // Store JWT securely

    const decoded = jwtDecode(token);
    setUser(decoded);

    // Exchange ID Token for Google OAuth Access Token
    fetch("http://127.0.0.1:8000/api/google-login/", {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.google_access_token) {
          localStorage.setItem("googleAccessToken", data.google_access_token);
          setGoogleAccessToken(data.google_access_token);
        } else {
          console.error("Google Access Token not received.");
        }
      })
      .catch((err) => console.error("Login Error:", err));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("googleAccessToken");
    setUser(null);
    setGoogleAccessToken(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const gToken = localStorage.getItem("googleAccessToken");
    if (token) {
      setUser(jwtDecode(token));
    }
    if (gToken) {
      setGoogleAccessToken(gToken);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="container">
        <h1>Google Drive Letter Creator</h1>

        {/* Google Authentication Section */}
        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => alert("Login Failed")}
            auto_select={true}
          />
        ) : (
          <div>
            <h2>Welcome, {user.name}!</h2>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}

        {/* Letter Editor Section */}
        {user && <LetterEditor />}

        {/* Google Drive Integration Section */}
        {user && <GoogleDriveIntegration googleAccessToken={googleAccessToken} />}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;



