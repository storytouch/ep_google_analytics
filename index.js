var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');

if(settings.ep_googleanalytics) {
  var gaCode = settings.ep_googleanalytics.gaCode;
  var trackingCode = settings.ep_googleanalytics.trackingCode;
}

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  if(trackingCode) { // using analytics.js
    var gaString = eejs.require('ep_googleanalytics/templates/analytics.js.ejs', {trackingCode: trackingCode});

    /* Leaving this in here for sanity */
    //  gaString += "<script type='text/javascript'>function sendGA(this){ga('send','event', this, 'Click', document.domain]);alert('sending to GA');}/* Google Analytics error catching */window.onerror = function(message, file, lineNumber) {ga('send','event','error',file + ':' + lineNumber,message + '']);};alert('test');$('div').bind('click', sendGA(this));$('ul').bind('click', sendGA(this));$('li').bind('click', alert('fu');sendGA(this));";
    //  gaString += "<script type='text/javascript'>$('a').bind('click', alert('wut'));</script>";
  }
  else if(gaCode) { // using ga.js (deprecated)
    var gaString = eejs.require('ep_googleanalytics/templates/ga.js.ejs', {gaCode: gaCode});

    /* Leaving this in here for sanity */
    //  gaString += "<script type='text/javascript'>function sendGA(this){_gaq.push(['_trackEvent', this, 'Click', document.domain]);alert('sending to GA');}/* Google Analytics error catching */window.onerror = function(message, file, lineNumber) {_gaq.push(['_trackEvent','error',file + ':' + lineNumber,message + '']);};alert('test');$('div').bind('click', sendGA(this));$('ul').bind('click', sendGA(this));$('li').bind('click', alert('fu');sendGA(this));";
    //  gaString += "<script type='text/javascript'>$('a').bind('click', alert('wut'));</script>";
  }
  else{ // gaCode isn't set
    var gaString = "<script>alert('ep_googleanalytics.trackingCode not set in settings.json, insert it in /admin/settings')</script>";
  }

  args.content = args.content + gaString; // add Google Analytics to the contents
  return cb();
}
