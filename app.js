import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import connectDB from './db.mjs';
const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

connectDB();

app.use(express.json());

app.use('/api', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
