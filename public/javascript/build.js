'use strict';

class BookItem extends React.Component {
  render() {
    var title = this.props.title;
    var author = this.props.author;
    return React.createElement(
      "div",
      { className: "card-panel white-text indigo" },
      title,
      " by ",
      author
    );
  }
}

class BookList extends React.Component {
  render() {
    var items = [];
    this.props.books.forEach(function (book) {
      var lc = book.title.toLowerCase();
      if (lc.indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }
      items.push(React.createElement(BookItem, { title: book.title, author: book.author }));
    }, this);
    return React.createElement(
      "div",
      null,
      items
    );
  }
}

class SearchBox extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.handleChange = () => {
      this.props.onUserInput(this.refs.filterTextInput.value);
    }, _temp;
  }

  render() {
    return React.createElement(
      "form",
      null,
      React.createElement("label", { htmlFor: "search" }),
      React.createElement("input", { className: "input-block",
        type: "text",
        id: "search",
        placeholder: "search books",
        ref: "filterTextInput",
        value: this.props.filterText,
        onChange: this.handleChange
      })
    );
  }
}

class FilterableBookList extends React.Component {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), this.state = { filterText: '' }, this.handleUserInput = filterText => {
      this.setState({
        filterText: filterText
      });
    }, _temp2;
  }

  render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "col s12" },
          React.createElement(SearchBox, { filterText: this.props.filterText, onUserInput: this.handleUserInput }),
          React.createElement(BookList, { books: this.props.books, filterText: this.state.filterText })
        )
      )
    );
  }
}

var BOOKS = [{ title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling' }, { title: 'The Lord of the Rings: Fellowship of the Ring', author: 'J.R.R. Tolkien' }, { title: 'Dune', author: 'Frank Herbert' }, { title: 'Lord of the Flies', author: 'William Golding' }, { title: 'Snow Crash', author: 'Neal Stephenson' }, { title: 'Neuromancer', author: 'William Gibson' }, { title: 'The Black Swan', author: 'Nicholas Taleb' }, { title: 'The Crucible', author: 'Arthur Miller' }, { title: 'Essentialism', author: 'Greg McKeown' }, { title: 'Breakfast of Champions', author: 'Kurt Vonnegut' }];

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);
ReactDOM.render(React.createElement(FilterableBookList, { books: BOOKS }), renderTarget);
