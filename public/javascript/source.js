'use strict';

class BookItem extends React.Component {

 toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
  formatAuthor = (str) => {
      var array = str.split(',')
      return this.toTitleCase(array[1] + " " + array[0])
    }
  formatBranch = (branches) => {
    if (typeof branches[0] === 'undefined') {
      return
    }
    else {
      return branches[0].name + ': ' + branches[0].status
    }
  }

  render() {
    var title = this.toTitleCase(this.props.title)
    var author = this.formatAuthor(this.props.author)
    var pages = this.props.pages
    var copies = (this.props.copies > 1 ? this.props.copies + " copies" : "1 copy")
    var isbn = this.props.isbn
    var image = this.props.image
    var branches = this.formatBranch(this.props.branches)
    var uri = this.props.uri
    return (
      <div className="col s4">
        <div className="book card-panel white-text light-blue lighten-3 z-depth-5">
          <div className="card-action center-align">
            <a className="waves-effect waves-light btn z-depth-2" href={uri}>Check Availability</a>
          </div>
          <div className="card-image">
            <p><img src={image} className="z-depth-4"/></p>
          </div>
          <div className="card-content content hoverable">
            <p className="z-depth-2">{title}</p>
            <p className="z-depth-2">by {author}</p>
            <p className="z-depth-2">{pages} pages</p>
            <p className="z-depth-2">{copies}</p>
            <p className="z-depth-2">{branches}</p>
          </div>
          
        </div>
      </div>
    )
  }
}

class BookList extends React.Component {
  render() {
    var items = [];
    this.props.books.forEach(function(book) {
      var lc = book.title.toLowerCase()
      if (lc.indexOf(this.props.filterText.toLowerCase()) === -1) {
        return;
      }
      items.push(<BookItem 
                  key={book._id}
                  title={book.title} 
                  author={book.author} 
                  pages={book.pages}
                  copies={book.copies}
                  isbn={book.isbn}
                  image={book.image}
                  branches={book.branches}
                  uri={book.uri} />)

    }, this);
    return (
      <div>{items}</div>
    );
  }
}

const SearchBox = (props) => (
  <div className="input-field teal lighten-2 z-depth-5">
    <input 
      className="input-block" 
      type="search"   
      id="search"
      placeholder="search books by title" 
      value={props.value}
      onChange={ev => props.onUserInput(ev.target.value)}
    required/>
    <label htmlFor="search"><i className="material-icons">search</i></label>
    <i className="material-icons" onClick={props.onClose}>close</i>
  </div>
)

class FilterableBookList extends React.Component {

  state = {
   filterText: '',
   data: []
  }

  componentDidMount() {
    this.loadBooksFromServer()
  }

  loadBooksFromServer() {
    $.ajax({
      url: this.props.url + this.state.filterText,
      dataType: 'json',
      success: (data) => {
        this.setState({data: data});
      },
      err: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    })
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.state.filterText !== nextState.filterText) {
      this.loadBooksFromServer();
    }
  }

  render() {
    return (
      <div>
        <hr/>
        <div className="row">
          <div className="col s12">
            <nav>
              <div className="nav-wrapper">
                <SearchBox
                  value={this.state.filterText}
                  onUserInput={v => this.setState({filterText: v})}
                  onClose={() => {this.setState({filterText: ''}, () => console.log('updated state')); console.log('close');} }
                   />
              </div>
            </nav>
            <hr/>
            <BookList books={this.state.data} filterText={this.state.filterText} />
          </div>
        </div>
      </div>
    )
  }
}

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);
ReactDOM.render(<FilterableBookList url="http://localhost:3000/books?limit=21&order=asc&title=" />, renderTarget);
