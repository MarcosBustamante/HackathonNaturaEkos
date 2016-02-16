var React = require('react');

var Camera = require('../components/Camera')
var MagicBoard = require('../components/MagicBoard')

React.render(
  (
    <div className="container">
      <Camera></Camera>
      <MagicBoard></MagicBoard>
    </div>
  ),
  document.getElementById('mainPage')
);
