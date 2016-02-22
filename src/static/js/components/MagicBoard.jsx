'use strict'

const React = require('react')
const PaletteButtons = require('./PaletteButtons')
const CameraButton = require('./CameraButton')
const DeviceListener = require('../services/DeviceListener')

let element_ids = [];
let device_listecer;
let context;
let p = false;

const MagicBoard = React.createClass({

  propTypes: {
    virtual_objects: React.PropTypes.array.isRequired,
  },

  getDefaultProps: function(){
    return {
      virtual_objects: [],
    }
  },

  componentDidMount: function(){
    context = document.getElementById('magic-board-id');

    device_listecer = new DeviceListener({
      orientation: this._fix_objects
    })

    this._renderVirtualObjects();
  },

  _fix_objects: function(e){
    const x = e.beta;
    const y = e.gamma;
    const z = e.alpha;

    element_ids.map(id => {
      let elem = document.getElementById(id);

      const ox = parseFloat(elem.getAttribute('x'));
      const oy = parseFloat(elem.getAttribute('y'));
      const oz = parseFloat(elem.getAttribute('z'));

      document.getElementById("teste1").textContent = x;
      document.getElementById("teste2").textContent = y;
      document.getElementById("teste3").textContent = z;

      elem.style.transform =
        "rotateY(" + ( -y ) + "deg)"; +
        "rotateX(" + x + "deg) " +
        "rotateZ(" + - ( z - 180 ) + "deg) ";
    });
  },

  _renderVirtualObjects: function(){
    if(context === undefined) {
      return;
    }

    this.props.virtual_objects.map(component => {
      if(component.kind == 'image'){
        this._addImage(component);
      }
    });
  },

  _addImage: function(component){
    let image = new Image();
    const id = "vo-" + element_ids.length;

    image.src = component.url;
    image.id = id;

    image.setAttribute('x', component.x);
    image.setAttribute('y', component.y);
    image.setAttribute('z', component.z);

    image.onload = function(){
      context.appendChild(image);
    }

    element_ids.push(id);
  },

  render: function() {
    this._renderVirtualObjects();

    let style = {
      'color': 'white',
      'font-size': '21px',
    }

    return (
      <div className="magic-board">
        <div id="magic-board-id">
          <span id="teste1" style={style}> Marcos </span><br/>
          <span id="teste2" style={style}> Marcos </span><br/>
          <span id="teste3" style={style}> Marcos </span><br/>
        </div>
        <PaletteButtons>
          <CameraButton />
        </PaletteButtons>
      </div>
    );
  },
});

module.exports = MagicBoard
