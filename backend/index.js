const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./db');

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server is listening to port", PORT);
})