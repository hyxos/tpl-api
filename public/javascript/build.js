'use strict';

class SearchComponent extends React.Component {
  render() {
    return React.createElement(
      'h1',
      null,
      'Dude, what up?'
    );
  }
}

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);
React.render(React.createElement(SearchComponent, null), renderTarget);
