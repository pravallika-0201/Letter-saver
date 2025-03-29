import React, { useEffect, useState } from "react";

const GoogleDriveIntegration = ({ letterContent }) => {
  const [googleAccessToken, setGoogleAccessToken] = useState(null);

  // Retrieve Google OAuth Access Token from localStorage
  useEffect(() => {
    const token = localStorage.getItem("googleAccessToken");
    if (token) {
      setGoogleAccessToken(token);
    } else {
      console.warn("Google Access Token missing. Please log in.");
    }
  }, []);

  // Function to Save Letter to Google Drive
  const handleSaveToDrive = async () => {
    if (!googleAccessToken) {
      alert("Please log in first!");
      return;
    }

    const metadata = {
      name: "MyLetter.docx", // Name of the file
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX format
    };

    const form = new FormData();
    form.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
    form.append("file", new Blob([letterContent], { type: "text/plain" }));

    try {
      const response = await fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
          },
          body: form,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const docUrl = `https://docs.google.com/document/d/${data.id}`;
        alert("Letter saved successfully!");
        window.open(docUrl, "_blank");
      } else {
        const errorResponse = await response.json();
        console.error("Error:", errorResponse);
        alert("Failed to save letter.");
      }
    } catch (error) {
      console.error("Error saving letter:", error);
      alert("An error occurred while saving.");
    }
  };

  return (
    <div>
      <h2>Save Letter to Google Drive</h2>
      <button onClick={handleSaveToDrive}>Save to Drive</button>
    </div>
  );
};

export default GoogleDriveIntegration;
