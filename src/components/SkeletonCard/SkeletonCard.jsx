import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-content">
        <div className="skeleton-text title" />
        <div className="skeleton-text year" />
        <div className="skeleton-tags">
          <div className="skeleton-pill" />
          <div className="skeleton-pill" />
          <div className="skeleton-pill" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;