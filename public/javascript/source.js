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
      var lc = book.title.toLowerCase()
      if (lc.indexOf(this.props.filterText) === -1) {
        return;
      }
      items.push(<BookItem title={book.title} author={book.author} />)
    }, this);
    return (
      <div>{items}</div>
    );
  }
}

class SearchBox extends React.Component {
  
  handleChange = () => {
    this.props.onUserInput(
      this.refs.filterTextInput.value
      )
  }
  
  render() {
    return (
      <form>
        <label htmlFor="search"></label>
        <input className="input-block" 
                type="text" 
                id="search"
                placeholder="search books" 
                ref="filterTextInput"
                value={this.props.filterText}
                onChange={this.handleChange}
                />
      </form>
    );
  }
}

class FilterableBookList extends React.Component {

  state = {filterText: ''}

  handleUserInput = (filterText) => {
    this.setState({
      filterText: filterText
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <SearchBox filterText={this.props.filterText} onUserInput={this.handleUserInput} />
            <BookList books={this.props.books} filterText={this.state.filterText} />
          </div>
        </div>
      </div>
    )
  }
}

var BOOKS = [
{title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling'},
{title: 'The Lord of the Rings: Fellowship of the Ring', author: 'J.R.R. Tolkien'},
{title: 'Dune', author: 'Frank Herbert'},
{title: 'Lord of the Flies', author: 'William Golding'},
{title: 'Snow Crash', author: 'Neal Stephenson'},
{title: 'Neuromancer', author: 'William Gibson'},
{title: 'The Black Swan', author: 'Nicholas Taleb'},
{title: 'The Crucible', author: 'Arthur Miller'},
{title: 'Essentialism', author: 'Greg McKeown'},
{title: 'Breakfast of Champions', author: 'Kurt Vonnegut'}
]

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);
ReactDOM.render(<FilterableBookList books={BOOKS} />, renderTarget);

