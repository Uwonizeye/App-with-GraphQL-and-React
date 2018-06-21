import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo'; // Helps to bind Apollo to React, compose fx helps to bind the 2 different queries to the component
import {getAuthorsQuery, addBookMutation, getBooksQuery} from '../queries/queries';


class AddBook extends Component{

    // Constructor
    constructor(props){
        super(props);
        this.state = {
                name:'',
                genre:'',
                authorId:''
        };
    }

    // Function to display authors in the component

    displayAuthors(){
        var data = this.props.getAuthorsQuery;
        if(data.loading){
            return(<option disabled> Loading Authors...</option>);
        }else{
            return data.authors.map(author => {
                return(<option key={author.id} value={author.id}>{author.name}</option>);
            })
        }
    }

    // Function to submit form
    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries:[{query:getBooksQuery}] //Makes sure that the book list updates itself as soon as a book is added on the front end
        });
    }

    // Function to render options
    render(){
        return(
            <form id="add-book" onSubmit={this.submitForm.bind(this)}>

                <div className="field">
                    <label> Book name: </label>
                    <input type="text" onChange={(e)=> this.setState({name:e.target.value})}/>
                </div>

                <div className="field">
                    <label> Genre: </label>
                    <input type="text" onChange={(e)=> this.setState({genre:e.target.value})}/>
                </div>

                <div className="field">
                    <label> Author: </label>
                    <select onChange={(e)=> this.setState({authorId:e.target.value})}>
                        <option> Select author </option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button> + </button>
            </form>


        );
    }
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(AddBook);