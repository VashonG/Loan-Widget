import React from 'react';
import ReactDOM from 'react-dom';
import LoanApplicationForm from './credit-application/src/LoanApplicationForm.jsx'; // Update the path


function loadLoanWidget() {
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'loan-widget-container';
  
    const embedButton = document.createElement('button');
    embedButton.textContent = 'Open Credit Application';
    embedButton.className = 'loan-widget-button';
    embedButton.addEventListener('click', () => {
      document.body.appendChild(widgetContainer);
      ReactDOM.render(<LoanApplicationForm />, widgetContainer);
    });
  
    document.body.appendChild(embedButton);
  }
  
  export { LoanApplicationForm };