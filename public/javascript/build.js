'use strict';

class BookItem extends React.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.toTitleCase = str => {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }, this.formatAuthor = str => {
      var array = str.split(',');
      return this.toTitleCase(array[1] + " " + array[0]);
    }, this.formatBranch = branches => {
      if (typeof branches[0] === 'undefined') {
        return;
      } else {
        return branches[0].name + ': ' + branches[0].status;
      }
    }, _temp;
  }

  render() {
    var title = this.toTitleCase(this.props.title);
    var author = this.formatAuthor(this.props.author);
    var pages = this.props.pages;
    var copies = this.props.copies > 1 ? this.props.copies + " copies" : "1 copy";
    var isbn = this.props.isbn;
    var image = this.props.image;
    var branches = this.formatBranch(this.props.branches);
    var uri = this.props.uri;
    return React.createElement(
      'div',
      { className: 'col s4' },
      React.createElement(
        'div',
        { className: 'book card-panel white-text light-blue lighten-3 z-depth-5' },
        React.createElement(
          'div',
          { className: 'card-action center-align' },
          React.createElement(
            'a',
            { className: 'waves-effect waves-light btn z-depth-2', href: uri },
            'Check Availability'
          )
        ),
        React.createElement(
          'div',
          { className: 'card-image' },
          React.createElement(
            'p',
            null,
            React.createElement('img', { src: image, className: 'z-depth-4' })
          )
        ),
        React.createElement(
          'div',
          { className: 'card-content content hoverable' },
          React.createElement(
            'p',
            { className: 'z-depth-2' },
            title
          ),
          React.createElement(
            'p',
            { className: 'z-depth-2' },
            'by ',
            author
          ),
          React.createElement(
            'p',
            { className: 'z-depth-2' },
            pages,
            ' pages'
          ),
          React.createElement(
            'p',
            { className: 'z-depth-2' },
            copies
          ),
          React.createElement(
            'p',
            { className: 'z-depth-2' },
            branches
          )
        )
      )
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
      items.push(React.createElement(BookItem, {
        key: book._id,
        title: book.title,
        author: book.author,
        pages: book.pages,
        copies: book.copies,
        isbn: book.isbn,
        image: book.image,
        branches: book.branches,
        uri: book.uri }));
    }, this);
    return React.createElement(
      'div',
      null,
      items
    );
  }
}

const SearchBox = props => React.createElement(
  'div',
  { className: 'input-field teal lighten-2 z-depth-5' },
  React.createElement('input', {
    className: 'input-block',
    type: 'search',
    id: 'search',
    placeholder: 'search books by title',
    value: props.value,
    onChange: ev => props.onUserInput(ev.target.value),
    required: true }),
  React.createElement(
    'label',
    { htmlFor: 'search' },
    React.createElement(
      'i',
      { className: 'material-icons' },
      'search'
    )
  ),
  React.createElement(
    'i',
    { className: 'material-icons', onClick: props.onClose },
    'close'
  )
);

class FilterableBookList extends React.Component {
  constructor(...args) {
    var _temp2;

    return _temp2 = super(...args), this.state = {
      filterText: '',
      data: []
    }, _temp2;
  }

  componentDidMount() {
    this.loadBooksFromServer();
  }

  loadBooksFromServer() {
    $.ajax({
      url: this.props.url + this.state.filterText,
      dataType: 'json',
      success: data => {
        this.setState({ data: data });
      },
      err: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.filterText !== nextState.filterText) {
      this.loadBooksFromServer();
    }
  }

  render() {
    return React.createElement(
      'div',
      null,
      React.createElement('hr', null),
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col s12' },
          React.createElement(
            'nav',
            null,
            React.createElement(
              'div',
              { className: 'nav-wrapper' },
              React.createElement(SearchBox, {
                value: this.state.filterText,
                onUserInput: v => this.setState({ filterText: v }),
                onClose: () => {
                  this.setState({ filterText: '' }, () => console.log('updated state'));console.log('close');
                }
              })
            )
          ),
          React.createElement('hr', null),
          React.createElement(BookList, { books: this.state.data, filterText: this.state.filterText })
        )
      )
    );
  }
}

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);
ReactDOM.render(React.createElement(FilterableBookList, { url: 'http://localhost:3000/books?limit=21&order=asc&title=' }), renderTarget);
