import React, { useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import Modal from 'react-modal';
import 'chart.js/auto';
import './App.css';

Modal.setAppElement('#root');

const Dashboard = () => {
  
  const data = {
    labels: ['2021-02-03', '2021-02-04', '2021-02-05', '2021-02-06', '2021-02-07', '2021-02-08', '2021-02-09'],
    datasets: [
      {
        label: 'New signups',
        data: [0, 0, 0.4, 0, 0, 0.5, 1],
        borderColor: '#00c49f',
        backgroundColor: 'rgba(0,196,159,0.2)',
        fill: true,
        tension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: true, grid: { display: false } },
      y: { beginAtZero: true, grid: { color: '#eaeaea' } },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [invites, setInvites] = useState(0);
  const [duration, setDuration] = useState(1);

  const basePrice = 500;
  const pricePerInvite = 50;
  const totalPrice = basePrice + invites * pricePerInvite * duration;

  const pieData = {
    labels: ['Base Price', 'Invite Cost'],
    datasets: [
      {
        data: [basePrice, invites * pricePerInvite * duration],
        backgroundColor: ['#00c49f', '#FF6384'],
        hoverBackgroundColor: ['#00c49f', '#FF6384'],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-buttons">
          <button onClick={() => setIsModalOpen(true)} id="invite">
            Invite
          </button>
          <button>Create course</button>
          <button>Preview home page</button>
          <button>Preview after login page</button>
          <button>View welcome screen</button>
        </div>
      </header>

      <nav className="dashboard-tabs">
        <span className="tab active">New signups</span>
        <span className="tab">Revenue</span>
        <span className="tab">Product sales</span>
        <span className="tab">Active learners</span>
        <select className="dropdown">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </nav>

      <div className="main-content">
        <div className="left-column">
          <div className="card new-users">
            <h3>New users</h3>
            <p>hubx, 24 minutes ago</p>
            <a href="#">see all</a>
          </div>

          <div className="card blog">
            <h3>How to sell courses blog</h3>
            <ul>
              <li>Blended Learning: What it is, Why it Matters...</li>
              <li>Join the Course Sales Bootcamp...</li>
              <li>12 Steps to Creating Awesome Live Classes in 2021</li>
              <li>Guy Kawasaki on the Future of Business...</li>
            </ul>
            <a href="#">see all</a>
          </div>

          <div className="card events-log">
            <h3>Events Log</h3>
            <p>hubx logged in 22 minutes ago</p>
            <a href="#">see all</a>
          </div>
        </div>

        <div className="right-column">
          <div className="card chart-card">
            <h3>New Signups (Last 7 Days)</h3>
            <div className="chart-container">
              <Line data={data} options={options} />
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h4>All users</h4>
              <p>1</p>
            </div>
            <div className="stat-card">
              <h4>Conversions</h4>
              <p>0%</p>
            </div>
            <div className="stat-card">
              <h4>30 Days Sales</h4>
              <p>0</p>
            </div>
            <div className="stat-card">
              <h4>Avg Time</h4>
              <p>0 min</p>
            </div>
            <div className="stat-card">
              <h4>Courses</h4>
              <p>0</p>
            </div>
            <div className="stat-card">
              <h4>Course Categories</h4>
              <p>0</p>
            </div>
          </div>

          <div className="card trial-card">
            <h3>Trial Period</h3>
            <p>30 Days Left</p>
            <button className="upgrade-button">Upgrade Now!</button>
            <div className="online-users">
              <h4>Online Users</h4>
              <p>hubx <span>(Contact)</span></p>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Invite Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Invite People to Event</h2>
        <form className="invite-form">
          <label>
            Number of Invites: {invites}
            <input
              type="range"
              value={invites}
              onChange={(e) => setInvites(parseInt(e.target.value))}
              min="0"
              max="100"  
              step="1"
            />
          </label>
          <label>
            Duration of Event (Hours): {duration}
            <input
              type="range"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              min="1"
              max="24"  
              step="1"
            />
          </label>
          <div className="price-info">
            <p>Total Price: ₹{totalPrice}</p>
          </div>
        </form>

        <div className="pie-chart">
          <Pie data={pieData} />
        </div>

        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default Dashboard;
