const express = require('express');
const cors = require('cors');


const port = 5000;
const app = express();
// Serve uploads
app.use('/uploads', express.static('uploads'));

app.use(cors())
// All Models Database
require('./model/user')
require('./model/artClub/clubNews')
require('./model/artClub/hallOfFame')
require('./model/artClub/gallery')
require('./model/artClub/legacy')
require('./model/danceClub/danceClubNews')
require('./model/artClub/contest')


// All APIs
app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/artClub'))
app.use(require('./routes/danceClub'))


app.listen(port , () => {
    console.log(`Server is running on port ${port}`);
})



const mongoose = require('mongoose');
const {mongoURl}  = require('./keys');


mongoose.connect(mongoURl)


mongoose.connection.on("connected" , () => {
    console.log("Mongoose is connected");
})

mongoose.connection.on("error" , () => {
    console.log("Mongoose is not connected");
})



