const whatToUse = 1;
const home = '/home/ubuntu/';
// const paths = {
//   enable: true,
//   cert: home + 'ssl/my-ssl.crt',
//   key: home + 'ssl/my-ssl.key'
// };
const paths = {
  enable: true,
  ca: require('fs').readFileSync(require('path').resolve(__dirname,'../ssl/my-gd-bundle.crt')),
  key: require('fs').readFileSync(require('path').resolve(__dirname,'../ssl/my-ssl.key')),
  cert: require('fs').readFileSync(require('path').resolve(__dirname,'../ssl/my-ssl.crt'))
}
const dev = {
  port: 1337,
  secure: {
    ssl: true,
    stripeLive: true
  },
  models: {
    connection: 'bravMongo'
  },
  // ssl: {
  //   paths: paths,
  //   ok: 'yes we have secure the path',
  // },
  ssl: {
    paths:{
      enable: true
    },
    ca: require('fs').readFileSync(require('path').resolve(__dirname,'../ssl/my-gd-bundle.crt')),
    key: require('fs').readFileSync(require('path').resolve(__dirname,'../ssl/my-ssl.key')),
    cert: require('fs').readFileSync(require('path').resolve(__dirname,'../ssl/my-ssl.crt')),
    ok: 'yes we have secure the path'
  },
  signalMasterConfig: {
    "isDev": true,
    "server": {
      "port": 1339,
      "secure": false,       //vatsal : For Local Testing turn secure : false
      "key": paths.key,
      "cert": paths.cert,
      "password": null
    },
    "rooms": {
      "maxClients": 6
    },
    "stunservers": [
      {
        "url": "stun:stun.l.google.com:19302"
      }
    ],
    "turnservers": [
      /*{
        "urls": ["turn:your.turn.servers.here"],
        "secret": "turnserversharedsecret",
        "expiry": 86400
      }*/
    ]
  }
};
const init = () => {
  if (whatToUse == 1) {
    paths.enable = true;
    return dev;
  }
};

module.exports = init();

