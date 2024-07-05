import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";


dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/groups', groupRoutes)

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error(err);
});

export default app;
