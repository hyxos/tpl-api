'use strict';

class BookItem extends React.Component {
  render() {
    var title = this.props.title
    var author = this.props.author
    return (
      <div className="card-panel white-text indigo">{title} by {author}</div>
    )
  }
}

class BookList extends React.Component {
  render() {
    var items = [];
    this.props.books.forEach(function(book) {
      items.push(<BookItem title={book.title} author={book.author} />)
     });
    return (
      <div>{items}</div>
    );
  }
}

class SearchBox extends React.Component {
  handleChange() {
    this.props.onUserInput(
      this.refs.filterTextInput.value
      )
  }
  render() {
    return (
      <form>
        <label htmlFor="search"></label>
        <input className="input-block" type="text" id="search" placeholder="search books" value={this.props.filterText} />
      </form>
    );
  }
}

class FilterableBookList extends React.Component {
  getInitialState() {
    return {
      filterText: ''
    }
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    })
  }
  debugger;
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <SearchBox filterText={this.props.filterText}/>
            <BookList books={this.props.books} filterText={this.props.filterText} />
          </div>
        </div>
      </div>
    )
  }
}

var BOOKS = [
{title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling'},
{title: 'The Lord of the Rings: Fellowship of the Ring', author: 'J.R.R. Tolkien'},
{title: 'Dune', author: 'Frank Herbert'}
]

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);
ReactDOM.render(<FilterableBookList books={BOOKS} />, renderTarget);

