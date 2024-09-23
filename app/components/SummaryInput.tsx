"use client";
import { useState, useEffect } from 'react';
import levenshtein from 'js-levenshtein';
import ProgressBar from './ProgressBar';

export default function SummaryComparison() {
  // Original summary that will be compared against
  const [originalSummary, setOriginalSummary] = useState('This is the original summary text.');
  const [revisedSummary, setRevisedSummary] = useState('');
  const [levenshteinDistance, setLevenshteinDistance] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleRevisedChange = (e: { target: { value: string; }; }) => {
    const input = e.target.value;
    setRevisedSummary(input);
  };

  useEffect(() => {
    // Calculate Levenshtein distance between original and revised summary
    const distance = levenshtein(originalSummary, revisedSummary);
    setLevenshteinDistance(distance);

    // Calculate the percentage difference based on the string lengths
    const maxLength = Math.max(originalSummary.length, revisedSummary.length);
    const percentageDiff = maxLength ? Math.round((distance / maxLength) * 100) : 0;
    setProgress(percentageDiff);

  }, [revisedSummary, originalSummary]);

  const handleSubmit = () => {
    if (progress >= 20) {
    // Log the Levenshtein distance and revised summary
    console.log('Levenshtein distance:', levenshteinDistance);
    console.log('Revised summary:', revisedSummary);

    // Update the original summary with the new one after submission
    setOriginalSummary(revisedSummary);
    }
    
  };

  return (
    <div className="summary-container">
      <h2>Write your revised summary</h2>

      <textarea
        value={revisedSummary}
        onChange={handleRevisedChange}
        placeholder="Write your revised summary here"
        className="summary-textarea"
      />

      <div className="levenshtein-distance">
        Levenshtein Distance: {levenshteinDistance}
      </div>

      <ProgressBar progress={progress} />
      <div className="progress-percentage">
        Difference: {progress}%
      </div>

      <button onClick={handleSubmit} disabled={progress < 20} className="submit-button">
        Submit
      </button>

      <style jsx>{`
        .summary-container {
          width: 80%;
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
          background-color: ${progress >= 20 ? '#0070f3' : '#ccc'};
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .submit-button:hover {
          background-color: ${progress >= 20 ? '#005bb5' : '#ccc'};
        }
      `}</style>
    </div>
  );
}
