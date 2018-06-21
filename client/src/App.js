import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';// react-apollo binds Apollo to React

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';

// apollo client setup
const client = new ApolloClient({
    // End point from which requests will be made
    uri:'http://localhost:3000/graphql'
})

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
            <div id="main">
                <h1> My 2018 Reading List </h1>
                <BookList/>
                <AddBook/>
            </div>
            </ApolloProvider>
        );
    }
}

export default App;
