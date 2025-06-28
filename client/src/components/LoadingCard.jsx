import React from "react"

export default function LoadingCard() {
  return (
    <div className="result-card loading-card" aria-hidden="true">
      <div className="result-header">
        <div className="result-title-section">
          <div className="loading-title"></div>
          <div className="loading-meta"></div>
        </div>
      </div>
      <div className="result-content">
        <div className="loading-description-1"></div>
        <div className="loading-description-2"></div>
      </div>
    </div>
  )
}