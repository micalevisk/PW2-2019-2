const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 3000;
const directoryName = process.argv[2];
const targetDirectory = path.resolve(directoryName);

if (process.argv.length !== 3
   || !directoryName
   || !directoryName.trim()) {
  console.error(`Usage: node ${path.basename(process.argv[1], '.js')} <PATH/TO/DIRECTORY>`);
  process.exit(1);
}

function afterReaddir(error, files) {
  if (error) {
    console.error('ERROR:', error.message);
    process.exit(2);
  }

  console.log('Read:', targetDirectory);

  http
    .createServer((_, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(files.join('\n'));
      res.end();
    })
    .listen(PORT, console.log.bind(null, `Listening at :${PORT}`));
}

fs.readdir(targetDirectory, afterReaddir);
