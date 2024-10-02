"use client";
import { useState, useEffect } from "react";
import levenshtein from "js-levenshtein";

export default function SummaryComparison() {
  const [originalSummary, setOriginalSummary] = useState("");
  const [revisedSummary, setRevisedSummary] = useState("");
  const [levenshteinDistance, setLevenshteinDistance] = useState(0);
  const [progress, setProgress] = useState(0);
  const maxDistance = 60; 
  const [isFirstSubmission, setIsFirstSubmission] = useState(true);


  const handleRevisedChange = (e: { target: { value: string } }) => {
    const input = e.target.value;
    setRevisedSummary(input);
  };

  useEffect(() => {
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
    } else if (levenshteinDistance >= 60) {
      // For subsequent submissions, use the progress logic
      setOriginalSummary(revisedSummary.trim());
    }
  };

  return (
    <div className="summary-container">
      <h2>Progress bar wrapping text area after first failed submission</h2>

      <textarea
        value={revisedSummary}
        onChange={handleRevisedChange}
        placeholder="Write your revised summary here"
        className="summary-textarea"
        style={{
          "--progress": `${progress}%`
        } as React.CSSProperties}
      />

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
          border: 0 solid #1e1e1e;
          position: relative;
          border-image: linear-gradient(
            to top,
            #228B22 0,
            #228B22 calc(var(--progress)),
            transparent calc(var(--progress)),
            transparent calc(var(--progress)),
            transparent calc(var(--progress))
          );
          border-image-slice: 1;
          border-width: 5px;
          transition: border-image 0.5s ease;
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
          background-color: ${levenshteinDistance >= 60 || isFirstSubmission ? "#0070f3" : "#ccc"};
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .submit-button:hover {
          background-color: ${levenshteinDistance >= 60 || isFirstSubmission ? "#005bb5" : "#ccc"};
        }
      `}</style>
    </div>
  );
}
