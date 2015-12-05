'use strict';

class SearchComponent extends React.Component {
  render() {
    return (
      <h1>Dude, what up?</h1>
      );
  }
}

const renderTarget = document.createElement('div');
document.body.appendChild(renderTarget);
React.render(<SearchComponent />, renderTarget);