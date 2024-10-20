import React, { useState } from 'react';
import './ResumeParser.css';

const CircularProgress = ({ size, strokeWidth, percentage }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="circular-progress">
      <circle
        className="circular-progress-background"
        stroke="#ddd"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="circular-progress-bar"
        stroke="#3498db"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="circular-progress-text">
        {Math.round(percentage)}%
      </text>
    </svg>
  );
};

const ResumeParser = () => {
  const [file, setFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setParsedData(null);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append("file", file);

    // Start progress animation
    const startTime = Date.now();
    const totalDuration = 10000; // 10 seconds

    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const newProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        clearInterval(progressInterval);
      }
    }, 100);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/upload_resume`, {
        method: "POST",
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error("Failed to parse resume");
      }

      const data = await response.json();
      setParsedData(data);
    } catch (err) {
      setError("An error occurred while parsing the resume. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
      clearInterval(progressInterval);
      setProgress(100);
    }
  };

  const renderParsedData = () => {
    if (!parsedData) return null;

    const formatValue = (value) => {
      if (typeof value === 'object' && value !== null) {
        return Object.entries(value).map(([key, val]) => (
          <p key={key}>
            <strong>{key}:</strong> {val}
          </p>
        ));
      }
      return value;
    };

    return (
      <div className="parsed-data">
        <h2>Parsed Resume Data</h2>
        <div className="data-grid">
          {Object.entries(parsedData).map(([key, value]) => (
            <div key={key} className="data-item">
              <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
              {Array.isArray(value) ? (
                <ul>
                  {value.map((item, index) => (
                    <li key={index}>
                      {typeof item === 'object' && item.degree ? (
                        <>
                          <strong>{item.degree}</strong>
                          <p>{item.institution}</p>
                          <p>{item.graduation_year}</p>
                        </>
                      ) : (
                        formatValue(item)
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                formatValue(value)
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="resume-parser">
      <h1>Resume Parser</h1>
      <div className="upload-section">
        <form onSubmit={handleSubmit}>
          <div className="file-input-wrapper">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              id="file-upload"
              className="file-input"
            />
            <label htmlFor="file-upload" className="file-label">
              {file ? file.name : 'Choose a file'}
            </label>
          </div>
          <button type="submit" disabled={loading || !file}>
            {loading ? "Parsing..." : "Parse Resume"}
          </button>
        </form>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {loading && (
        <div className="progress-container">
          <CircularProgress size={100} strokeWidth={10} percentage={progress} />
          <p>Parsing resume... {Math.round(progress)}%</p>
        </div>
      )}
      
      {renderParsedData()}
    </div>
  );
};

export default ResumeParser;