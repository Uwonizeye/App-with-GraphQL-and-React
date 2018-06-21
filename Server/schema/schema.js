const graphql = require('graphql');
const _= require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

// GraphQL properties are used
const{GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull // Stops us from making mutations that contains null values for required fields
} = graphql;


// Defining types
// all fields must be wrapped in a function i.e: fields()=> to allow the whole file to be run before calling the fields() fx
// Otherwise, running will fail, saying either BookType or AuthorType is undefined (depending on which is defined first in the file)

const BookType = new GraphQLObjectType({

    name: 'Book',
    fields:()=>({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},

        author:{ // Will help us return the book's author
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId); // findById is a convenience method offered by Mongoose
            }

        }
    })
});

const AuthorType = new GraphQLObjectType({

    name: 'Author',
    fields:()=>({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},

        books:{ // Will help us return the author's book collection
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({authorId:parent.id});
            }
        }
    })
});


// Set up the Root query, i.e: a way to jump into the graph to query data

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{ // fields is not wrapped in a function as we did above because we don't care about the order of invocation

        book:{
            type:BookType,
            args:{id:{type: GraphQLID}},
            resolve(parent,args){ //code to get data from db/ other source
                return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type: GraphQLID}},
            resolve(parent, args){
                return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parents, args){
                return Book.find({});
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parents, args){
                return Author.find({});
            }
        },

    }
});

// Set up the mutations, i.e: a way to interact with the data. Ex: add, delete, change.
const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{

        addAuthor:{
            type: AuthorType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save(); // adds specified author to the database
            }
        },

        addBook:{
            type: BookType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                genre:{type: new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull (GraphQLID)}
            },

            resolve(parent, args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save(); // adds specified book to the database
            }
        }
    }

});


module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation: Mutation //We're determining which query a user is allowed doing at the front-end
});