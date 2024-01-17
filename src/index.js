const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const  signupRoute = require('./routes/route');
const app = express();
const PORT =5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/admin', signupRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
