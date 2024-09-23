import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export default class ProgressBar extends React.Component<ProgressBarProps> {
  render() {
    const { progress } = this.props;
    return (
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <style jsx>{`
          .progress-container {
            width: 100%;
            height: 20px;
            background-color: #e0e0df;
            border-radius: 5px;
            margin: 10px 0;
          }
          .progress-bar {
            height: 100%;
            background-color: #4caf50;
            border-radius: 5px;
            transition: width 0.4s ease;
          }
        `}</style>
      </div>
    );
  }
}