'use strict'

const React = require('react')
const PaletteButtons = require('./PaletteButtons')
const CameraButton = require('./CameraButton')

var context = undefined;


const MagicBoard = React.createClass({
  componentDidMount: function(){
    let image = {
      'kind': 'image',
      'url': 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/green-metallic-orbs-icons-natural-wonders/052334-green-metallic-orb-icon-natural-wonders-tree5.png',
    };
    this._addVirtualComponent(image)
  },

  _addVirtualComponent: function(component: Object){
    if(context === undefined) {
      let canvas = document.getElementById('magic-board-id');
      context = canvas.getContext('2d');
    }

    if(component.kind == 'image'){
      this._addImage(component);
    }
  },

  _addImage: function(component){
    let image = new Image();
    image.src = component.url;
    image.onload = function(){
      context.drawImage(image, 10, 10);
    }
  },

  render: function() {
    return (
      <div className="magic-board">
        <canvas id="magic-board-id" />
        <PaletteButtons>
          <CameraButton />
        </PaletteButtons>
      </div>
    );
  },
});

module.exports = MagicBoard
