"use client";
import { useState, useEffect } from "react";
import levenshtein from "js-levenshtein";
import ProgressBar from "./ProgressBar";

export default function SummaryInput() {
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
      <h2>Horizontal Progress Bar after first failed submission.</h2>

      <textarea
        value={revisedSummary}
        onChange={handleRevisedChange}
        placeholder="Write your revised summary here"
        className="summary-textarea"
      />

{(!isFirstSubmission) && (
        <>
          <ProgressBar progress={progress} />
        </>
      )}

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
        .summary-textarea {
          width: 100%;
          height: 150px;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          color: #1e1e1e;
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
