import React from "react"
import { Globe, ExternalLink } from "lucide-react"

export default function ResultCard({ result }) {
  // FIX: Use the correct properties from the API response object.
  // The API provides `link`, `title`, `snippet`, and `displayed_link`.
  const { title, link, snippet, displayed_link } = result;

  return (
    <div className="result-card">
      <div className="result-header">
        <div className="result-title-section">
          <h3 className="result-title">
            <a href={link} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h3>
          <div className="result-meta">
            <Globe size={12} aria-hidden="true" />
            <span className="domain">{displayed_link}</span>
          </div>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="external-link-btn" aria-label={`Open ${title} in new tab`}>
          <ExternalLink size={16} />
        </a>
      </div>
      <div className="result-content">
        <p className="result-description">{snippet}</p>
      </div>
    </div>
  );
}