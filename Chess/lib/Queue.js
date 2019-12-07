const Queue = require('bull');

const { QUEUE_REDIS_URL } = process.env;

const { jobs, names } = require('../app/jobs');

const log = logger('queue');

const queues = Object.values(jobs)
  .map((job) => ({
    bull: new Queue(job.key, QUEUE_REDIS_URL),
    name: job.key,
    handle: job.handle,
    options: job.options,
  }));

const QueueHandler = {
  names,
  queues,

  getQueueByName(queueName) {
    const queue = this.queues.find((q) => q.name === queueName);
    if (!queue) {
      throw Error(`Queue with name '${queueName}' was not found!`);
    }
    return queue;
  },

  add(queueName, data) {
    const queue = this.getQueueByName(queueName);
    const job = queue.bull.add(queue.name, data, queue.options);
    log(`queued a job with name '${job.name}'`);
    return job;
  },

  processAll() {
    return this.queues.forEach((queue) => {
      queue.bull.process(queue.name, queue.handle);
      log(`processing '${queue.name}' processor`);

      queue.bull.on('failed', (job, err) => {
        log.error(`job '${job.name}' failed with data:`, job.data);
        log.error(job.name, err);
      });
    });
  },
};

module.exports = QueueHandler;
