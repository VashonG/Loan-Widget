import axios from 'axios';
import React, { useState } from 'react';
import './styles/styles.css'; // Make sure the path is correct

const LoanApplicationForm = () => {
  // State Management
  const [activeSlide, setActiveSlide] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({ name: '', address: '', email: '' });
  const [loanAmount, setLoanAmount] = useState(1000);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [businessDuration, setBusinessDuration] = useState('');
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [creditScore, setCreditScore] = useState('');

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleSliderChange = (e) => {
    setLoanAmount(e.target.value);
  };
  
  const handleNextSlide = () => {
    if (activeSlide < 4) {
      setActiveSlide(prevSlide => prevSlide + 1);
    }
  };

  const handleBusinessDurationChange = (duration) => {
    setBusinessDuration(duration);
    console.log(duration);
  };

  const handleMonthlyRevenueChange = (revenue) => {
    setMonthlyRevenue(revenue);
    console.log(revenue);
  };

  const handleCreditScoreChange = (score) => {
    setCreditScore(score);
    console.log(score);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      personalInfo,
      loanAmount,
      businessDuration,
      monthlyRevenue,
      creditScore
    };
    try {
      const response = await axios.post('http://localhost:5000/apply', dataToSend);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error submitting the form", error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Credit Application</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="loan-modal">
            <button onClick={handleCloseModal} className="close-button">×</button>
            <h2 className="modal-title">Loan Application</h2>

            {/* Slide 1 content */}
            {activeSlide === 1 && (
              <div className={`slide-content ${activeSlide !== 1 ? 'hidden' : ''}`}>
                <label className="label">Loan Amount:</label>
                <input
                  className="input"
                  type="range"
                  min="1000"
                  max="5000"
                  step="500"
                  value={loanAmount}
                  onChange={handleSliderChange}
                />
                <p className="selected-amount">Selected Amount: ${loanAmount}</p>
                <button className="next-button" onClick={handleNextSlide}>Next</button>
              </div>
            )}

            {/* Slide 2 content */}
            {activeSlide === 2 && (
              <div className={`slide-content ${activeSlide !== 2 ? 'hidden' : ''}`}>
                <label className="label">Business Duration:</label>
                <select
                  className="input"
                  value={businessDuration}
                  onChange={(e) => handleBusinessDurationChange(e.target.value)}
                >
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
                <button className="next-button" onClick={handleNextSlide}>Next</button>
              </div>
            )}

            {/* Slide 3 content */}
            {activeSlide === 3 && (
              <div className={`slide-content ${activeSlide !== 3 ? 'hidden' : ''}`}>
                <label className="label">Monthly Revenue:</label>
                <select
                  className="input"
                  value={monthlyRevenue}
                  onChange={(e) => handleMonthlyRevenueChange(e.target.value)}
                >
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000+">$10,000+</option>
                </select>
                <button className="next-button" onClick={handleNextSlide}>Next</button>
              </div>
            )}

            {/* Slide 4 content */}
            {activeSlide === 4 && (
              <div className={`slide-content ${activeSlide !== 4 ? 'hidden' : ''}`}>
                <label className="label">Credit Score:</label>
                <select
                  className="input"
                  value={creditScore}
                  onChange={(e) => handleCreditScoreChange(e.target.value)}
                >
                  <option value="poor">Poor</option>
                  <option value="average">Average</option>
                  <option value="good">Good</option>
                  <option value="excellent">Excellent</option>
                </select>
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplicationForm;
