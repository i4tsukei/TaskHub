import { useState } from 'react';
import './Avaliacao.css';

function Avaliacao() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating > 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setFeedback('');
      }, 3000);
    }
  };

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => onRatingChange(star)}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="avaliacao">
        <div className="avaliacao-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Obrigado pela sua avaliação!</h2>
            <p>Seu feedback é muito importante para melhorarmos o TaskHub.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="avaliacao">
      <div className="avaliacao-container">
        <div className="avaliacao-header">
          <h1>Avalie sua experiência</h1>
          <p>Sua opinião nos ajuda a melhorar o TaskHub</p>
        </div>

        <form onSubmit={handleSubmit} className="avaliacao-form">
          <div className="rating-section">
            <label className="rating-label">Como você avalia o TaskHub?</label>
            <StarRating rating={rating} onRatingChange={setRating} />
            <div className="rating-text">
              {rating === 1 && "Muito insatisfeito"}
              {rating === 2 && "Insatisfeito"}
              {rating === 3 && "Neutro"}
              {rating === 4 && "Satisfeito"}
              {rating === 5 && "Muito satisfeito"}
            </div>
          </div>

          <div className="feedback-section">
            <label className="feedback-label">Deixe seu comentário (opcional)</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Conte-nos sobre sua experiência com o TaskHub..."
              className="feedback-textarea"
              rows="4"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={rating === 0}
          >
            Enviar Avaliação
          </button>
        </form>

        <div className="features-feedback">
          <h3>O que você mais gosta no TaskHub?</h3>
          <div className="features-grid">
            <div className="feature-item">
              <span className="feature-icon">📅</span>
              <span>Calendário intuitivo</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>Checklist dinâmico</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📎</span>
              <span>Anexos multimídia</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span>Interface moderna</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Avaliacao;