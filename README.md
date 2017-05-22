# ep_google_analytics

Add Google Analytics to Etherpad Lite. Keep track of pageview events by default.

**IMPORTANT**: Add the following to your settings.json file:
```
"ep_googleanalytics": {
  "trackingCode": "UA-1234567-8"
}
```

*Notice*: the original version of ep_googleanalytics uses the deprecated `ga.js`. So if your Etherpad instance has legacy code using `gaq.push(...)` -- on other plugins, for example --, you need to make sure ep_googleanalytics loads `ga.js` instead. To do that, use the setting `gaCode` instead of `trackingCode`:
```
"ep_googleanalytics": {
  "gaCode": "UA-1234567-8"
}
```