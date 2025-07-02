const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/ticketingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const passengerSchema = new mongoose.Schema({
  name: String,
  email: String,
  transportType: String,
  seatNumber: String,
  date: String,
});

const Passenger = mongoose.model('Passenger', passengerSchema);

app.post('/api/register', async (req, res) => {
  const passenger = new Passenger(req.body);
  await passenger.save();
  res.json(passenger);
});

app.get('/api/ticket/:email', async (req, res) => {
  const passenger = await Passenger.findOne({ email: req.params.email });
  if (!passenger) return res.status(404).json({ message: 'Not found' });
  res.json(passenger);
});

app.listen(5000, () => console.log('Server running on port 5000'));