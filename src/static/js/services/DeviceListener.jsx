var DeviceListener = function(/*?object*/ listeners) {
  if(listeners === undefined){
    listeners = {};
  }

  this._orientation_callback = listeners.orientation;
  this._latlong_callback = listeners.latlong;
  this._add_events();
}

DeviceListener.prototype.orientation_listener = function (listener) {
  this._orientation_callback = listener;
  this._add_events();
};

DeviceListener.prototype.latlong_listener = function (listener) {
  this._latlong = listener;
};

DeviceListener.prototype._add_events = function (){
    window.addEventListener('deviceorientation', this._orientation_callback);
}

function orient( aa ) {
    var x = aa.x, y = aa.y, z = aa.z, a = aa.a,
        c = Math.cos( aa.a ),
        s = Math.sin( aa.a ),
        t = 1 - c,
        // axis-angle to rotation matrix
        rm00 =    c + x*x * t,
        rm10 =  z*s + y*x * t,
        rm20 = -y*s + z*x * t,
        rm01 = -z*s + x*y * t,
        rm11 =    c + y*y * t,
        rm21 =  x*s + z*y * t,
        rm02 =  y*s + x*z * t,
        rm12 = -x*s + y*z * t,
        rm22 =    c + z*z * t,

        TO_DEG = 180 / Math.PI,
        ea = [],
        n = Math.sqrt( rm22 * rm22 + rm20 * rm20 );

    // rotation matrix to Euler angles
    ea[1] = Math.atan2( -rm21, n );

    if ( n > 0.001 ) {
        ea[0] = Math.atan2( rm01, rm11 );
        ea[2] = Math.atan2( rm20, rm22 );

    } else {
        ea[0] = 0;
        ea[2] = ( rm21 > 0 ? 1 : -1 ) * Math.atan2( -rm10, rm00 );
    }

    return {
        alpha: -ea[0] * TO_DEG - 180,
        beta:  -ea[1] * TO_DEG,
        gamma:  ea[2] * TO_DEG
    };
}

module.exports = DeviceListener;
