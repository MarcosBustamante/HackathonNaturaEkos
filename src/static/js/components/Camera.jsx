'use stict'

const React = require('react');

const Camera = React.createClass({
  render : function() {
    return (
      <div className="camera">
        Camera
         <input type="file" accept="video/*;capture=camcorder" />
      </div>
    );
  },
});

module.exports = Camera
