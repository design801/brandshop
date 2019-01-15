const express = require('express')
const compression = require('compression')
const next = require('next')
const routes = require('../../common/routes')
const http = require('http')
const https = require('https')
const fs = require('fs')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dir: './src/client', dev})
const handler = routes.getRequestHandler(app);
const api = require('./api/handler')
const config = require('../../common/config')
const trustIP = require('../utils/trustIP')
const conn = require('../mongoDB/conn')
const multer = require('multer')
const shell = require('shelljs')
const db = require('../mongoDB/schema')
conn();

app.prepare().then(() => {  
  const server = express();
  server.use(express.urlencoded({extended : true}));
  server.use(compression());

  var storage = multer.diskStorage({    
    destination: function (req, file, cb) {  

      console.log('req.query.theme : ' + req.query.theme);
      console.log('req.query.id : ' + req.query.id);

      const theme = req.query.theme;
      const ID = req.query.id;
      const splitID = ID.split('.');

      const dir = 'src/client/static/images/' + theme + '/' + splitID[0] + '/' + splitID[1] + '/' + splitID[2] + '/' + splitID[3] + '/';
      console.log("dir : " + dir);

      if(!fs.existsSync(dir)) {
        console.log('a');
        shell.mkdir('-p', dir);
      }

      cb(null, dir);
    },
    filename: async function (req, file, cb) {      
      console.log("originalname : " + file.originalname);
      //cb(null, file.originalname)
      cb(null, file.originalname);
      //file saved now the thisiscalledafterupload will be called
      const themeID = req.query.theme;
      const ID = req.query.id;
      const splitID = ID.split('.');

      console.log(themeID);
      console.log(splitID[0]);
      console.log(splitID[1]);
      console.log(splitID[2]);
      console.log(splitID[3]);

      const theme = await db.themeSchema.findOne({id: themeID});
      const dir = '/static/images/' + themeID + '/' + splitID[0] + '/' + splitID[1] + '/' + splitID[2] + '/' + splitID[3] + '/' + file.originalname;

      switch(splitID[0]) {
        case 'main':
        {
          if( splitID[1] === 'desktop' ) {
            const name = "main.img";
            await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name]: dir}}, {new: true});
          } else {
            const name = "main.imgMobile";
            await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name]: dir}}, {new: true});
          }
        }
        break;
        case 'intro':
        {
          if( splitID[1] === 'desktop' ) {
            const name = "intro.img";
            await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name]: dir}}, {new: true});
          } else {
            const name = "intro.imgMobile";
            await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name]: dir}}, {new: true});
          }
        }
        break;
        case 'about':
        {
          if( splitID[1] === 'desktop' ) {
            const name = "about." + splitID[3] + ".img";
            await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name] : dir}}, {new: true});
          } else {
            const name = "aboutMobile." + splitID[3] + ".img";
            await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name]: dir}}, {new: true});
          }
        }
        break;
        case 'archive':
        {
          const name = "archive.img";
          if( splitID[1] === 'desktop' ) {
            await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name] : dir}}, {new: true});
          } else {
            await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name]: dir}}, {new: true});
          }
        }
        break;
        case 'shop':
        {
          if( splitID[1] === 'desktop' ) {
            if( splitID[3] === 'bg' ) {
              const name = "brand." + splitID[2] + ".bg";
              await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name]: dir}}, {new: true});
            } else {
              const name = "brand." + splitID[2] + ".content." + splitID[3] + ".img";
              await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name]: dir}}, {new: true});
            }
          } else {
            if( splitID[3] === 'bg' ) {
              const name = "brand." + splitID[2] + ".bgMobile";
              await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name]: dir}}, {new: true});
            } else {
              const name = "brand." + splitID[2] + ".content." + splitID[3] + ".imgMobile";
              await db.themeSchema.findOneAndUpdate({id: themeID}, {$set: {[name]: dir}}, {new: true});
            }
          }

        }
        break;

        default:
        break;
      }


  }
  });
  var upload = multer({ storage: storage });
  
  server.post('/upload', upload.any(), (req, res) => {
    console.log('/upload');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    
    res.send("downed");
  });

  server.get('/api/:id/:msg', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    return req.params.msg === undefined ? app.render(req, res, '/') : api(req, res);
  });

  server.get('/admin', (req, res) => trustIP(req) === true ? app.render(req, res, '/admin') : app.render(req, res, '/'));

  server.get('*', (req, res) => handler(req, res));

  config.createServer === 'http' ? createHttpServer(server) : createHttpsServer(server);
});

const createHttpServer = server => {
  http.createServer(server).listen(config.port, () => {
    console.log(config.name, 'http listen (', config.port, ')');
  });
}

const createHttpsServer = server => {
  var options = {  
    key: fs.readFileSync(config[process.env.NODE_ENV].key),
    cert: fs.readFileSync(config[deprocess.env.NODE_ENV].cert)
  };

  https.createServer(server).listen(options, config.port, () => {
    console.log(config.name, 'https listen (', config.port, ')');
  });
}