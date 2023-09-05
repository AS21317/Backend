const express = require('express');
const app = express();
const port = process.env.PORT||5000;
const connectDB = require('./helpers/mongoinit');
const studentRoutes = require('./routes/students');
const eventRoutes = require('./routes/events')




app.use(express.json());

// Connect to MongoDB 
connectDB();  

app.use('/api/students', studentRoutes); 
app.use('/api/events', eventRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!'); 
    }


); 

// Using Middlewares 


app.listen(port, () => {
    console.log(`server is running at ${port}`)
    }
); 