// This file is created to separate queries from specific components, so they are more accessible

import {gql} from 'apollo-boost';

// Get books query (gets all of the books)
const getBooksQuery = gql`
    {
        books{
            name
            id
        }
    
    }
`


// Author query
const getAuthorsQuery = gql`
    {
        authors{
            name
            id
        }
    
    }
`

// Get book query

const getBookQuery = gql`
    query($id:ID){
        book(id:$id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`


// addBookMutation. Note: query variables are used, with $ sign, these help to update the info using what is being passed into the state and inject that info into the mutation
const addBookMutation = gql`
    mutation($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name, genre:$genre, authorId:$authorId){
            name
            id
        }
    }
`


export {getAuthorsQuery, getBooksQuery, addBookMutation, getBookQuery};