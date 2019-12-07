require('./config/bootstrap');

const Queue = require('./lib/Queue');

Queue.processAll();
