require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//solve cors
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

//upload directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//db connection
const db = require('./config/db');

const router = require('./routes/Router');
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});