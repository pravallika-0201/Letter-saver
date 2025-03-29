import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const LetterEditor = () => {
  const [content, setContent] = useState("");

  // Load draft from local storage when component mounts
  useEffect(() => {
    const savedDraft = localStorage.getItem("letterDraft");
    if (savedDraft) {
      setContent(savedDraft);
    }
  }, []);

  // Save draft to local storage
  const handleSaveDraft = () => {
    localStorage.setItem("letterDraft", content);
    alert("Draft saved successfully!");
  };

  return (
    <div className="editor-container">
      <h2>Letter Editor</h2>
      <ReactQuill value={content} onChange={setContent} placeholder="Start writing your letter..." />
      <button onClick={handleSaveDraft} className="save-button">Save Draft</button>
    </div>
  );
};

export default LetterEditor;
