"use client";
import { useState, useEffect } from 'react';
import levenshtein from 'js-levenshtein';

export default function SummaryComparison() {
  // Original summary that will be compared against
  const [originalSummary, setOriginalSummary] = useState('This is the original summary text.');
  const [revisedSummary, setRevisedSummary] = useState('');
  const [levenshteinDistance, setLevenshteinDistance] = useState(0);

  const handleRevisedChange = (e: { target: { value: string; }; }) => {
    const input = e.target.value;
    setRevisedSummary(input);
  };

  useEffect(() => {
    // Calculate Levenshtein distance between original and revised summary
    const distance = levenshtein(originalSummary, revisedSummary);
    setLevenshteinDistance(distance);
  }, [revisedSummary, originalSummary]);

  const handleSubmit = () => {
    // Log the Levenshtein distance and revised summary
    console.log('Levenshtein distance:', levenshteinDistance);
    console.log('Revised summary:', revisedSummary);

    // Update the original summary with the new one after submission
    setOriginalSummary(revisedSummary);

    // Reset the revised summary input
    // setRevisedSummary('');
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

      <button onClick={handleSubmit} className="submit-button">
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
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .submit-button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
}
