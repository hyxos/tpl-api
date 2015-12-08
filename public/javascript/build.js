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
      items.push(React.createElement(BookItem, { title: book.title, author: book.author }));
    });
    return React.createElement(
      "div",
      null,
      items
    );
  }
}

class SearchBox extends React.Component {
  handleChange() {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }
  render() {
    return React.createElement(
      "form",
      null,
      React.createElement("label", { htmlFor: "search" }),
      React.createElement("input", { className: "input-block", type: "text", id: "search", placeholder: "search books", value: this.props.filterText })
    );
  }
}

class FilterableBookList extends React.Component {
  getInitialState() {
    return {
      filterText: ''
    };
  }

  handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    });
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
          React.createElement(SearchBox, { filterText: this.props.filterText }),
          React.createElement(BookList, { books: this.props.books, filterText: this.props.filterText })
        )
      )
    );
  }
}

var BOOKS = [{ title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling' }, { title: 'The Lord of the Rings: Fellowship of the Ring', author: 'J.R.R. Tolkien' }, { title: 'Dune', author: 'Frank Herbert' }];

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);
ReactDOM.render(React.createElement(FilterableBookList, { books: BOOKS }), renderTarget);
