// LoanApplicationForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';  // Make sure the path is correct

const [activeSlide, setActiveSlide] = useState(1);

const LoanApplicationForm = () => {
  // State Management
  const [personalInfo, setPersonalInfo] = useState({ name: '', address: '', email: '' });
  const [loanAmount, setLoanAmount] = useState(1000);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  
  const [businessDuration, setBusinessDuration] = useState('');

  const handleBusinessDurationChange = (duration) => {
    setBusinessDuration(duration);
    console.log(duration);
  };
  
  
  const [monthlyRevenue, setMonthlyRevenue] = useState('');

  const handleMonthlyRevenueChange = (revenue) => {
    setMonthlyRevenue(revenue);
    console.log(revenue);
  };
  
  
  const [creditScore, setCreditScore] = useState('');

  const handleCreditScoreChange = (score) => {
    setCreditScore(score);
    console.log(score);
  };
  
  

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/apply', personalInfo);
      console.log(response.data);
    } catch (error) {
      console.error("There was an error submitting the form", error);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-8" style={{ width: '510px', height: '632.59px' }}>
        <button onClick={handleCloseModal} className="absolute top-2 right-2 text-xl">×</button>
        <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white p-2 rounded-t-lg">Loan Application</h2>
        
        {activeSlide === 1 && (
          <>
            {/* Slide 1 content */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700 mr-2">Loan Amount:</span>
              <span className="font-bold">${loanAmount}</span>
            </div>
            <div className="flex items-center">
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={loanAmount}
                onChange={handleSliderChange}
                className="w-full h-2 mt-2 rounded-lg appearance-none bg-transparent"
              />
            </div>
            <div className="h-2 bg-gray-500 rounded-lg">
              <div className="h-full bg-blue-500" style={{ width: `${(loanAmount / 100000) * 100}%` }}></div>
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg" onClick={handleNextSlide}>
                Next
              </button>
            </div>
          </>
        )}

        {activeSlide === 2 && (
          <>
            {/* Slide 2 content */}
            <h3 className="text-lg font-bold mb-4">How long has your business been active?</h3>
            <div className="grid grid-cols-2 gap-2">
              {["Less than three months", "3 - 5 months", "5 - 10 months", "10+ months", "I haven't registered my business yet"].map((duration) => (
                <button
                  key={duration}
                  className="button-option w-full h-full rounded-lg bg-white border border-gray-200 text-sm text-gray-600 leading-6 font-semibold font-sans hover:bg-gray-100 transition ease-in-out duration-150"
                  style={{ width: '210px', height: '50px' }}
                  onClick={() => handleBusinessDurationChange(duration)}
                >
                  {duration}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 text-sm text-blue-500 rounded-lg" onClick={() => setActiveSlide(activeSlide - 1)}>
                Previous
              </button>
              <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg" onClick={handleNextSlide}>
                Next
              </button>
            </div>
          </>
        )}

        {activeSlide === 3 && (
          <>
            {/* Slide 3 content */}
            <h3 className="text-lg font-bold mb-4">Monthly Revenue</h3>
            <div className="grid grid-cols-2 gap-2">
              {["$0 to $4k per month", "$4k to $8k per month", "$8k to $14k per month", "$14k to $20k per month", "$20k to $30k per month", "$30k to $50k per month", "$50k to $100k per month", "$100k to $150k per month", "$150k to $250k per month", "$250k to $500k per month", "$500k to $1m per month", "$1m+ per month"].map((revenue) => (
                <button
                  key={revenue}
                  className="button-option w-full h-full rounded-lg bg-white border border-gray-200 text-sm text-gray-600 leading-6 font-semibold font-sans hover:bg-gray-100 transition ease-in-out duration-150"
                  style={{ width: '210px', height: '50px' }}
                  onClick={() => handleMonthlyRevenueChange(revenue)}
                >
                  {revenue}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 text-sm text-blue-500 rounded-lg" onClick={() => setActiveSlide(activeSlide - 1)}>
                Previous
              </button>
              <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg" onClick={handleNextSlide}>
                Next
              </button>
            </div>
          </>
        )}

        {activeSlide === 4 && (
          <>
            {/* Slide 4 content */}
            <h3 className="text-lg font-bold mb-4">Personal Credit Score</h3>
            <div className="grid grid-cols-2 gap-2">
              {["449 or below", "450 - 499", "500 - 549", "550 - 599", "600 - 649", "650 - 719", "720 or above", "Unsure"].map((score) => (
                <button
                  key={score}
                  className="button-option w-full h-full rounded-lg bg-white border border-gray-200 text-sm text-gray-600 leading-6 font-semibold font-sans hover:bg-gray-100 transition ease-in-out duration-150"
                  style={{ width: '210px', height: '50px' }}
                  onClick={() => handleCreditScoreChange(score)}
                >
                  {score}
                </button>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              <button className="px-4 py-2 text-sm text-blue-500 rounded-lg" onClick={() => setActiveSlide(activeSlide - 1)}>
                Previous
              </button>
              <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg">
                Apply
              </button>
            </div>
          </>
        )}

      </div>
    </div>
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

      {/* Loan Amount Slider */}
      <div>
        <label>Loan Amount: ${loanAmount}</label>
        <input 
            type="range" 
            min="1000" 
            max="100000" 
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
        />
      </div>

      {/* Open Modal Button */}
      <button onClick={() => setIsModalOpen(true)}>Open Credit Application</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          {/* Here, place your credit application or any other content you'd like to display in the modal */}
          {/* You can close the modal by setting `isModalOpen` to false */}
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default LoanApplicationForm;
