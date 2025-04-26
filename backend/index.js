const express = require('express');
const rootRouter = require('./routes/index')
const cors = require('cors')
const app = express();
const  connectDB  = require('./routes/connectionDB')


app.use(cors());
app.use(express.json());
app.use('/api/v1', rootRouter);

connectDB();
app.get('/', (req,res) => {
    res.send("hello world")
})

app.listen(3000)