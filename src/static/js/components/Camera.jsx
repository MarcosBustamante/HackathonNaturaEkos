'use stict'

const React = require('react');

const Camera = React.createClass({
  componentDidMount: function(){
    MediaStreamTrack.getSources(function(medias) {
    	let video_elem = document.getElementById("video");
      let video_obj = {
        'video': true,
      };

    	const errBack = function(error) {
  			console.log("Video capture error: ", error.code);
  		};

      medias.map(media => {
        if(media.kind == "video" && media.facing == "environment"){
          video_obj = {
            'video': {'optional': [{'sourceId': media.id}]},
          };
        }
      });

    	if(navigator.getUserMedia) {
    		navigator.getUserMedia(video_obj, function(stream) {
    			video_elem.src = stream;
    			video_elem.play();
    		}, errBack);
    	} else if(navigator.webkitGetUserMedia) {
    		navigator.webkitGetUserMedia(video_obj, function(stream){
    			video_elem.src = window.webkitURL.createObjectURL(stream);
           video_elem.onloadedmetadata = function(e) {
               video_elem.play();
           };
    		}, errBack);
    	}else if(navigator.mozGetUserMedia) {
    		navigator.mozGetUserMedia(video_obj, function(stream){
    			video_elem.src = window.URL.createObjectURL(stream);
    			video_elem.play();
    		}, errBack);
    	}
    });
  },

  render: function() {
    return (
      <video id="video" className="camera" autoplay />
    );
  },
});

module.exports = Camera
