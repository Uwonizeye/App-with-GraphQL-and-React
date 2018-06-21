import React, { Component } from 'react';
import {graphql} from 'react-apollo'; // Helps to bind Apollo to React
import {getBooksQuery} from '../queries/queries';

// Components
import BookDetails from './BookDetails';

class BookList extends Component {

    // Constructor
    constructor(props){
        super(props);
        this.state = {
            selected: null // 'select' keeps track of the ID of each book that is clicked on
        }
    }

    // Display data function
    displayBooks(){
        var data = this.props.data;
        if(data.loading){
            return (<div> Loading books...</div>);
        }else{
            return data.books.map(book => {
                return(
                    <li key={book.id} onClick={(e)=>{this.setState({selected:book.id})}}>{book.name}</li>
                )
            })
        }
    }


    // Render component function
    render() {
        return (
            <div>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookId={this.state.selected}/>
            </div>
        );
    }
}

export default  graphql(getBooksQuery)(BookList);
