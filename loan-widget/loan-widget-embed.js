import React from 'react';
import ReactDOM from 'react-dom';
import { LoanApplicationForm } from './loan-widget/loan-widget.js'; // Update the path


(function() {
    var script = document.createElement('script');
    script.src = 'https://github.com/VashonG/Loan-Widget/blob/main/loan-widget/loan-widget.js'; // Replace with the actual URL
    document.head.appendChild(script);
  
    var button = document.createElement('button');
    button.textContent = 'Open Loan Application';
    button.className = 'loan-widget-button';
  
    button.addEventListener('click', function() {
      var widgetContainer = document.createElement('div');
      widgetContainer.className = 'loan-widget-container';
  
      var closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.className = 'loan-widget-close-button';
      closeButton.addEventListener('click', function() {
        document.body.removeChild(widgetContainer);
      });
  
      widgetContainer.appendChild(closeButton);
      document.body.appendChild(widgetContainer);
  
      ReactDOM.render(React.createElement(LoanApplicationForm), widgetContainer);
    });
  
    document.body.appendChild(button);
  })();
  