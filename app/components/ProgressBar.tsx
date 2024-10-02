import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export default class ProgressBar extends React.Component<ProgressBarProps> {
  render() {
    const { progress} = this.props;

    // if (progress === 0) {
    //   return null;
    // }

    const progressBarColor = progress >= 50 ? '#4caf50' : '#ff9800'; 

    
    return (
      <div className="progress-container">
      
        <div className="progress-bar" style={{ width: `${progress}%`, background: progressBarColor }}></div>
        <style jsx>{`
          .progress-container {
            width: 50%;
            height: 20px;
            position: relative;
            background-color: #e0e0df;
            border-radius: 5px;
            margin: 10px 0;
            overflow: hidden;
          }
          .minimum-bar {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 2px;
            background-color: #000;
            z-index: 1;
          }
          .progress-bar {
            height: 100%;
            border-radius: 5px;
            transition: width 0.4s ease, background-color 0.4s ease;
            z-index: 0;
          }
        `}</style>
      </div>
    );
  }
}