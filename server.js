// server.js
import cronService from './services/cronService.js';
import usersRouter from './routes/users.js';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.json());

// Initialize the cron service for reminders
cronService.initialize();

// Use the users router for managing users
app.use('/user', usersRouter);

app.use('/', (req, res) => {
  console.log("Welcome to Assesment Test Backend Dev");
  res.send('Welcome to Assesment Test Backend Dev');
} );

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
