# express-static-https [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
Simple static express web server for the command line.

## Install
Include with "npm install" or "yarn add":

```bash
yarn add express-static-https
```

## Usage

No frills static serving of a single folder over https. Logging options coming shortly.

```bash
express-static-https path/to/files --port #### --certificate path/to/fullchain.pem --key path/to/privatekey.pem
```

## License

MIT © [Kirk Bulis](http://github.com/kbulis)

[npm-image]: https://badge.fury.io/js/express-static-https.svg
[npm-url]: https://npmjs.org/package/express-static-https
[travis-image]: https://travis-ci.org/kbulis/express-static-https.svg?branch=master
[travis-url]: https://travis-ci.org/kbulis/express-static-https
[daviddm-image]: https://david-dm.org/kbulis/express-static-https.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kbulis/express-static-https
