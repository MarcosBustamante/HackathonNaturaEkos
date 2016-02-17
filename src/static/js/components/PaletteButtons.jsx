const React = require('react')

const PaletteButtons = React.createClass({
  render: function() {
    return (
      <div className="palette-container">
        <div className="middle">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = PaletteButtons
