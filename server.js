const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.get('/api/users', async (req, res) => {
  console.log('Fetching users from the database');
  const users = await User.find();
  console.log(`Found ${users.length} users`);
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
