var eejs = require('ep_etherpad-lite/node/eejs/');
var settings = require('ep_etherpad-lite/node/utils/Settings');

if(settings.ep_googleanalytics){ // Setup testing else poop out
  var gaCode = settings.ep_googleanalytics.gaCode;
}else{
  var gaCode = false;
}

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  if(gaCode){
    var gaString = eejs.require('ep_googleanalytics/templates/analytics.ejs', {gaCode: gaCode});
  }
  else{ // gaCode isn't set
    var gaString = "<script>alert('ep_googleanalytics.gaCode not set in settings.json, insert it in /admin/settings')</script>";
  }

/* Leaving this in here for sanity */
//  gaString += "<script type='text/javascript'>function sendGA(this){ga('send','event', this, 'Click', document.domain]);alert('sending to GA');}/* Google Analytics error catching */window.onerror = function(message, file, lineNumber) {ga('send','event','error',file + ':' + lineNumber,message + '']);};alert('test');$('div').bind('click', sendGA(this));$('ul').bind('click', sendGA(this));$('li').bind('click', alert('fu');sendGA(this));";
//  gaString += "<script type='text/javascript'>$('a').bind('click', alert('wut'));</script>";

  args.content = args.content + gaString; // add Google Analytics to the contents
  return cb();
}
