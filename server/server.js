const express = require('express');
const cors = require('cors');
const path = require('path');
const sequelize = require("./config/Database");
const {authRoutes, userRoutes, taskRoutes} = require('./routes/index');


const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});