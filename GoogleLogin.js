import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";


const GoogleAuth = () => {
  const handleSuccess = async (response) => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/google/", {
        token: response.credential, // Send Google token to backend
      });
      localStorage.setItem("access_token", res.data.access); // Save JWT token
      localStorage.setItem("refresh_token", res.data.refresh);
      alert("Login Successful");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleFailure = (error) => {
    console.log("Google Login Failed", error);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <h2>Login with Google</h2>
        <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
