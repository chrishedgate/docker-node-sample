console.log('serviceA');

var ip = require('ip');
console.log(ip.address());

var express = require('express');
var redis = require('redis');

var app = express();
var server = require('http').createServer(app);

app.set('port', process.env.PORT || 8081);
app.set('env', process.env.NODE_ENV || 'development');

app.use(function(req, res, next) {
    console.log('%s %s', req.method, req.path);
    next();
});

app.get('/status', function(req, res, next) {
  res.json({service: {name: 'serviceA'}});
});

var subscriber = redis.createClient(process.env.REDIS_PORT_6379_TCP_PORT, process.env.REDIS_PORT_6379_TCP_ADDR);
var publisher = redis.createClient(process.env.REDIS_PORT_6379_TCP_PORT, process.env.REDIS_PORT_6379_TCP_ADDR);

subscriber.on('ready', function(err) {
  subscriber.subscribe('pingA');
  subscriber.subscribe('pongA');
  console.log("subscriber ready");
});
publisher.on('ready', function(err) {
  console.log("publisher ready");
});
subscriber.on('error', function (err) {
  console.log("REDIS ERROR,",  err.stack);
});
publisher.on('error', function (err) {
  console.log("REDIS ERROR,",  err.stack);
});

subscriber.on('message', function(event, data) {
  console.log('received message: '+event+' - '+data);
  if (event === 'pingA') {
    publisher.publish('pongB', data, function(err) {
      if (err) { return next(err); }
    });
  }
});

app.get('/publish/:msg', function(req, res, next) {
  publisher.publish('pingB', req.params.msg, function(err) {
    if (err) { return next(err); }
    res.json({result: true});
  });
});

exports.start = function(done) {
  server.listen(app.get('port'), function(err) {
    console.log(app.get('env') + " is listening on port " + app.get('port'));
    if (typeof done == 'function') {
      done(err);
    }
  });
};

exports.stop = function() {
  server.close();
};
