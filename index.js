var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');

if(settings.ep_googleanalytics){ // Setup testing else poop out
  var gaCode = settings.ep_googleanalytics.gaCode;
}else{
  var gaCode = false;
}

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  if(gaCode){
    var gaString = "<script type='text/javascript'>var _gaq = _gaq || [];_gaq.push(['_setAccount', '"+gaCode+"']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();</script>";
  }
  else{ // gaCode isn't set
    var gaString = "<script>alert('ep_googleanalytics.gaCode not set in settings.json, insert it in /admin/settings')</script>";
  }

/* Leaving this in here for sanity */
//  gaString += "<script type='text/javascript'>function sendGA(this){_gaq.push(['_trackEvent', this, 'Click', document.domain]);alert('sending to GA');}/* Google Analytics error catching */window.onerror = function(message, file, lineNumber) {_gaq.push(['_trackEvent','error',file + ':' + lineNumber,message + '']);};alert('test');$('div').bind('click', sendGA(this));$('ul').bind('click', sendGA(this));$('li').bind('click', alert('fu');sendGA(this));";
//  gaString += "<script type='text/javascript'>$('a').bind('click', alert('wut'));</script>";

  args.content = args.content + gaString; // add Google Analytics to the contents
  return cb();
}


