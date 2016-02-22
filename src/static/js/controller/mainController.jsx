'use strict'

const React = require('react');

const Camera = require('../components/Camera')
const MagicBoard = require('../components/MagicBoard')

const Container = React.createClass({
  getInitialState: function(){
    return {
      virtual_objects: [],
    }
  },

  componentDidMount: function(){
    this.setState({
      virtual_objects: [{
        'kind': 'image',
        'url': 'http://icons.iconarchive.com/icons/treetog/i/128/Floppy-Small-icon.png',
        'x': -2.602911721353272,
        'y': -1.2989375,
        'z': 2.000000,
      }],
    });
  },

  render: function(){
    return (
      <div className="container">
        <Camera />
        <MagicBoard
          virtual_objects={this.state.virtual_objects}
        />
      </div>
    );
  },
});

React.render(
  <Container />,
  document.getElementById('mainPage')
);
