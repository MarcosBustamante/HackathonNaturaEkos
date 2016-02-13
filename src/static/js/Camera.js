'use stict'

var React = require('react');
var ReactDOM = require('react-dom');

Camera = React.createClass({
  render : function() {
    return (
      <div className="camera">
        Camera !
        <MagicBoard />
      </div>
    );
  },
});

ReactDOM.render(
  <Camera />,
  document.getElementById('mainPage')
);
