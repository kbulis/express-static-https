import * as express from 'express';
import * as parsing from 'yargs';
import * as https from 'https';
import * as path from 'path';
import * as fs from 'fs';

const app: express.Express = express();
const arg: any = parsing
  .usage('Usage: $0 --path [path/to/files] --port [listening on] --certificate [path/to/fullchain.pem] --key [path/to/privatekey.pem] --missing [path/to/missing.html]')
  .default('port', 5000)
  .default('path', './')
  .demandOption([
    'certificate',
    'key',
  ])
  .argv;

/**
 * express-static-https
 * 
 * Loading handlers to serve static content from the specified local path. Keep
 * in mind that paths to missing content can be overriden with a default (html)
 * file as response. This helps when serving single-page-apps with dynamic paths
 * on refresh -- just specify the app's index.html.
 * 
 * We require accessible certificate and key, so we punt when not found.
 * 
 * @author Kirk Bulis
 * 
 */
app.use([
  express.static('./build', {
    index: false,
  }),
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (arg.missing) {
      res.sendFile(path.join(process.cwd(), arg.path, arg.missing));
    }
    else {
      next();
    }
  },
]);

try {
  if (fs.existsSync('./banner.text') === true) {
    console.log(fs.readFileSync('./banner.text', 'utf8'));
  }
}
catch (eX) {
}

if (fs.existsSync(arg.certificate) === true && fs.existsSync(arg.key) === true) {
  https.createServer({ cert: fs.readFileSync(arg.certificate, 'utf8'), key: fs.readFileSync(arg.key, 'utf8') }, app).listen(arg.port);
}
else {
  console.log(`! missing expected ${arg.certificate} or ${arg.key}`);
  process.exit(1);
}

console.log(`. listening for requests of ${arg.path} on port ${arg.port}`);
console.log(`. using ${arg.certificate} and ${arg.key}`);
console.log(`. https enabled`);

export {
  app,
};
