import React from "react"
import { Calendar, Globe, Star, ExternalLink} from "lucide-react"

export default function ResultCard({ result }) {
  return (
    <div className="result-card">
      <div className="result-header">
        <div className="result-title-section">
          <h3 className="result-title">
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
          </h3>
          <div className="result-meta">
            <Globe size={12} aria-hidden="true" /> {/* aria-hidden for decorative icons */}
            <span className="domain">{result.domain}</span>
            <div className="separator"></div>
            <Calendar size={12} aria-hidden="true" />
            <span>{result.timestamp}</span>
            <div className="separator"></div>
            <Star size={12} className="star-icon" aria-hidden="true" />
            <span>{result.rating}</span>
          </div>
        </div>
        <a href={result.url} target="_blank" rel="noopener noreferrer" className="external-link-btn" aria-label={`Open ${result.title} in new tab`}>
          <ExternalLink size={16} />
        </a>
      </div>
      <div className="result-content">
        <p className="result-description">{result.description}</p>
        <div className="result-tags">
          {result.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}