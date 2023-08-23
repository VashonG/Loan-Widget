import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const AdminPanel = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/accounts').then(res => setAccounts(res.data));
  }, []);

  const data = {
    labels: ['Applications Submitted', 'Loans Funded', 'Applications Denied'],
    datasets: [
      {
        label: 'Metrics',
        data: [accounts.filter(acc => acc.status === 'submitted').length, accounts.filter(acc => acc.status === 'funded').length, accounts.filter(acc => acc.status === 'denied').length],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 99, 132, 0.6)']
      }
    ]
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <Bar data={data} />
      <ul>
        {accounts.map(account => <li key={account._id}>{account.name} - {account.balance}</li>)}
      </ul>
    </div>
  );
};

export default AdminPanel;
