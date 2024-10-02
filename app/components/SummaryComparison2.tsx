"use client";
import { useState, useEffect } from "react";
import levenshtein from "js-levenshtein";

export default function SummaryComparison2() {
  const [originalSummary, setOriginalSummary] = useState("");
  const [revisedSummary, setRevisedSummary] = useState("");
  const [levenshteinDistance, setLevenshteinDistance] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isFirstSubmission, setIsFirstSubmission] = useState(true);
  const maxDistance = 60;

  const handleRevisedChange = (e: { target: { value: string } }) => {
    const input = e.target.value;
    setRevisedSummary(input);
  };

  useEffect(() => {
    // Calculate Levenshtein distance between original and revised summary
    if (revisedSummary.trim().length > 0 && !isFirstSubmission) {
        const distance = levenshtein(originalSummary.trim(), revisedSummary.trim());
        setLevenshteinDistance(distance);
  
        // Calculate the progress percentage based on Levenshtein distance
        const percentage = Math.min(Math.round((distance / maxDistance) * 100), 100);
        
        setProgress(percentage);
    } else {
      setLevenshteinDistance(0);
      setProgress(0);
    }
  }, [revisedSummary, originalSummary, isFirstSubmission]);

  const handleSubmit = () => {
    if (isFirstSubmission) {
      // If it's the first submission, allow the user to submit even if progress is 0
      setOriginalSummary(revisedSummary.trim());
      setIsFirstSubmission(false);
    } else if (progress >= 20) {
      // For subsequent submissions, use the progress logic
      setOriginalSummary(revisedSummary.trim());
    }
  };

  return (
    <div className="summary-container">
      <h2>Vertical progress bar after first summary submission</h2>
      <div className="textarea-progress-container">
        <textarea
          value={revisedSummary}
          onChange={handleRevisedChange}
          placeholder="Write your revised summary here"
          className="summary-textarea"
        />

        {(!isFirstSubmission) && (
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ height: `${progress}%` }}></div>
          </div>
        )}
      </div>


      <div className="levenshtein-distance">
        Levenshtein Distance: {levenshteinDistance}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFirstSubmission && levenshteinDistance < 60}
        className="submit-button"
      >
        Submit
      </button>

      <style jsx>{`
        .summary-container {
          width: 60%;
          margin: 20px auto;
        }
        .textarea-progress-container {
          display: flex;
          align-items: flex-start;
        }
        .summary-textarea {
          width: 100%;
          height: 150px;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: #1e1e1e;
          margin-right: 10px;
        }
        .progress-bar-container {
          width: 10px;
          height: 150px;
          background-color: #e0e0df;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
        }
        .progress-bar {
          width: 100%;
          background-color: ${progress >= 50 ? '#4caf50' : '#ff9800'};
          bottom: 0;
          position: absolute;
          transition: height 0.5s ease;
        }
        .progress-percentage {
          margin-top: 10px;
          font-size: 14px;
          color: #555;
        }
        .levenshtein-distance {
          margin-top: 10px;
          font-size: 14px;
          color: #555;
        }
        .submit-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: ${levenshteinDistance >= 60 || isFirstSubmission
            ? "#0070f3"
            : "#ccc"};
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .submit-button:hover {
          background-color: ${levenshteinDistance >= 60 || isFirstSubmission
            ? "#005bb5"
            : "#ccc"};
        }
      `}</style>
    </div>
  );
}
