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
            {/* FIX: Use `link` for the href attribute instead of `url` */}
            <a href={link} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </h3>
          <div className="result-meta">
            <Globe size={12} aria-hidden="true" />
            {/* FIX: Use `displayed_link` instead of `domain` */}
            <span className="domain">{displayed_link}</span>
            
            {/* REMOVED: Calendar and Star icons because `timestamp` and `rating` data is not available */}
          </div>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="external-link-btn" aria-label={`Open ${title} in new tab`}>
          <ExternalLink size={16} />
        </a>
      </div>
      <div className="result-content">
        {/* FIX: Use `snippet` for the description text instead of `description` */}
        <p className="result-description">{snippet}</p>

        {/* REMOVED: The tags section because `result.tags` does not exist in the API response */}
      </div>
    </div>
  )
}