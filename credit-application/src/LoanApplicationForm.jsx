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
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
          <div className="relative bg-white rounded-lg p-8" style={{ width: '510px', height: '632.59px' }}>
            <button onClick={handleCloseModal} className="absolute top-2 right-2 text-xl">×</button>
            <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white p-2 rounded-t-lg">Loan Application</h2>
            
            { /* Slide 1 content */ }
            {activeSlide === 1 && (
              <>
                <label>Loan Amount:</label>
                <input 
                  type="range" 
                  min="1000" 
                  max="5000" 
                  step="500" 
                  value={loanAmount} 
                  onChange={handleSliderChange}
                />
                <p>Selected Amount: ${loanAmount}</p>
                <button onClick={handleNextSlide}>Next</button>
              </>
            )}

            { /* Slide 2 content */ }
            {activeSlide === 2 && (
              <>
                <label>Business Duration:</label>
                <select value={businessDuration} onChange={(e) => handleBusinessDurationChange(e.target.value)}>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
                <button onClick={handleNextSlide}>Next</button>
              </>
            )}

            { /* Slide 3 content */ }
            {activeSlide === 3 && (
              <>
                <label>Monthly Revenue:</label>
                <select value={monthlyRevenue} onChange={(e) => handleMonthlyRevenueChange(e.target.value)}>
                  <option value="1000-5000">$1,000 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="10000+">$10,000+</option>
                </select>
                <button onClick={handleNextSlide}>Next</button>
              </>
            )}

            { /* Slide 4 content */ }
            {activeSlide === 4 && (
              <>
                <label>Credit Score:</label>
                <select value={creditScore} onChange={(e) => handleCreditScoreChange(e.target.value)}>
                  <option value="poor">Poor</option>
                  <option value="average">Average</option>
                  <option value="good">Good</option>
                  <option value="excellent">Excellent</option>
                </select>
                <button onClick={handleSubmit}>Submit</button>
              </>
            )}

          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
              type="text"
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
              type="text"
              value={personalInfo.address}
              onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
