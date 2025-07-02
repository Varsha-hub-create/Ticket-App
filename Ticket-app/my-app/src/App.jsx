// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [page, setPage] = useState('login');
//   const [email, setEmail] = useState('');
//   const [passenger, setPassenger] = useState({
//     name: '',
//     email: '',
//     transportType: 'Bus',
//     seatNumber: '',
//     date: ''
//   });
//   const [ticket, setTicket] = useState(null);

//   const handleLogin = () => setPage('register');

//   const handleRegister = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/register', passenger);
//       setTicket(res.data);
//       setPage('ticket');
//     } catch (err) {
//       alert('Registration failed');
//     }
//   };

//   const downloadTicket = () => {
//     const element = document.createElement('a');
//     const file = new Blob([JSON.stringify(ticket, null, 2)], { type: 'text/plain' });
//     element.href = URL.createObjectURL(file);
//     element.download = 'ticket.txt';
//     document.body.appendChild(element);
//     element.click();
//   };

//   return (
//     <div className="App">
//       {page === 'login' && (
//         <div>
//           <h2>Login</h2>
//           <input placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
//           <button onClick={handleLogin}>Login</button>
//         </div>
//       )}

//       {page === 'register' && (
//         <div>
//           <h2>Register Passenger</h2>
//           <input placeholder="Name" onChange={e => setPassenger({ ...passenger, name: e.target.value })} />
//           <input placeholder="Email" value={email} readOnly />
//           <select onChange={e => setPassenger({ ...passenger, transportType: e.target.value })}>
//             <option>Bus</option>
//             <option>Train</option>
//             <option>Flight</option>
//           </select>
//           <input placeholder="Seat Number" onChange={e => setPassenger({ ...passenger, seatNumber: e.target.value })} />
//           <input type="date" onChange={e => setPassenger({ ...passenger, date: e.target.value })} />
//           <button onClick={handleRegister}>Generate Ticket</button>
//         </div>
//       )}

//       {page === 'ticket' && ticket && (
//         <div className="ticket">
//           <h2>{ticket.name}'s Ticket🎫</h2>
//           <div className="ticket-details">
//             <p><strong>Name:</strong> {ticket.name}</p>
//             <p><strong>Email:</strong> {ticket.email}</p>
//             <p><strong>Transport Type:</strong> {ticket.transportType}</p>
//             <p><strong>Seat Number:</strong> {ticket.seatNumber}</p>
//             <p><strong>Date:</strong> {ticket.date}</p>
//           </div>
//           <button onClick={downloadTicket}>Download Ticket</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [page, setPage] = useState('login');
  const [email, setEmail] = useState('');
  const [passenger, setPassenger] = useState({
    name: '',
    email: '',
    transportType: 'Bus',
    seatNumber: '',
    date: ''
  });
  const [ticket, setTicket] = useState(null);

  const handleLogin = () => setPage('register');

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        ...passenger,
        email: email
      });
      setTicket(res.data);
      setPage('ticket');
    } catch (err) {
      alert('Registration failed');
    }
  };

  const downloadTicket = () => {
    const element = document.createElement('a');
    const fileContent = `
    === Digital Travel Ticket ===

    Name: ${ticket.name}
    Email: ${ticket.email}
    Transport Type: ${ticket.transportType}
    Seat Number: ${ticket.seatNumber}
    Date: ${ticket.date}
    `;
    const file = new Blob([fileContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'ticket.txt';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="App">
      {page === 'login' && (
        <div>
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}

      {page === 'register' && (
        <div>
          <h2>Register Passenger</h2>
          <input
            type="text"
            placeholder="Full Name"
            onChange={e =>
              setPassenger({ ...passenger, name: e.target.value })
            }
          />
          <input
            type="text"
            value={email}
            readOnly
            style={{ backgroundColor: '#eee' }}
          />
          <select
            onChange={e =>
              setPassenger({ ...passenger, transportType: e.target.value })
            }
          >
            <option>Bus</option>
            <option>Train</option>
            <option>Flight</option>
          </select>
          <input
            type="text"
            placeholder="Seat Number"
            onChange={e =>
              setPassenger({ ...passenger, seatNumber: e.target.value })
            }
          />
          <input
            type="date"
            onChange={e =>
              setPassenger({ ...passenger, date: e.target.value })
            }
          />
          <button onClick={handleRegister}>Generate Ticket</button>
        </div>
      )}

      {page === 'ticket' && ticket && (
        <div className="ticket">
          <h2>{ticket.name}'s Ticket 🎫</h2>
          <div className="ticket-details">
            <p><strong>🧑 Name:</strong> {ticket.name}</p>
            <p><strong>📧 Email:</strong> {ticket.email}</p>
            <p><strong>🚍 Transport Type:</strong> {ticket.transportType}</p>
            <p><strong>💺 Seat Number:</strong> {ticket.seatNumber}</p>
            <p><strong>📅 Date:</strong> {ticket.date}</p>
          </div>
          <button onClick={downloadTicket}>Download Ticket</button>
        </div>
      )}
    </div>
  );
}

export default App;
