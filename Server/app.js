

const express = require('express');

const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');

const mongoose = require('mongoose');

const cors = require('cors');

const app = express();


// Allow cross origin request, i.e: server to (other)server requests
app.use(cors());

// Connect to database using the db string obtained from mLab
mongoose.connect('mongodb://user1:test123@ds215089.mlab.com:15089/gql-uwonizeye');

mongoose.connection.once('open',() => { // Event listener to let us know connecting to DB has been made
   console.log('We are connected to database. Woot woot!');
});

//middleware
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// Make server listen to designated port: 3000
app.listen(3000,() => {
    console.log('Now listening for requests on port 3000');
});

