const db = require('../../mongoDB/schema')

const nodeMailer = require('nodemailer')
const smtpPool = require('nodemailer-smtp-pool')

const create = async(msg) => { 
  if(msg.pass === '') return {result: 'pass'};

  if(await db.userSchema.findOne({account: msg.account}) !== null) return {result: 'exists account'};

  const user = new db.userSchema({account: msg.account, nick: msg.nick, pass: msg.pass, balance: 10000, followers: []});
  user.save();
  
  return {result: 'ok', account: user.account, nick: user.nick, balance: user.balance, followers: user.followers};
}

const detail = async(msg) => {
  const user = await db.userSchema.findOne({account: msg.account});
  const history = await db.historySchema.find().where('account').equals(msg.account);
  return {result: 'ok', balance: user.balance, date: user.date, nick: user.nick, history};
}

const info = async(msg) => {
  const user = await db.userSchema.findOne({account: msg.account});
  return {result: 'ok', balance: user.balance, date: user.date, nick: user.nick};
}

const login = async(msg) => {
  const user = await db.userSchema.findOne({account: msg.account});

  if(user === null) return {result: 'create account'};
  if(user.pass !== msg.pass) return {result: 'login error'};

  return {result: 'ok', account: user.account, nick: user.nick, balance: user.balance, followers: user.followers};
}

const chatting = async(msg) => {
  const result = await db.chattingSchema.find().in('users', [msg.id]);
  return {result: 'ok', chattings: result.map(v => {return {nicks: result.nicks, message: v.message, date: v.date}})}
}

const follower = async(msg) => {
  await db.userSchema.findOneAndUpdate({account: msg.account}, {$push: {followers: msg.followerAccount}}, {new: true})
  return {result: 'ok'};
}

const mail = async(msg) => {

  let message = '';
  message += '<div>company :  '+ msg.company + '</div><br/>';
  message += '<div>name : '+ msg.name + '</div><br/>';
  message += '<div>email : '+ msg.email + '</div><br/>';
  message += '<div>phone : '+ msg.phone + '</div><br/>';
  message += '<div>content : '+ msg.content + '</div><br/>';

  var transporter = nodeMailer.createTransport(smtpPool({
    service: 'Gmail',
    host: 'localhost',
    port: 465,
    auth: {
      user: 'doo8866@numixent.com',
      pass: 'dlenghks85',
    },
    tls: {
      rejectUnauthorize: false,
    },
    maxConnections: 5,
    maxmessages: 10,
  }));

  var mailOptions = {
    to: 'doo8866@numixent.com',
    // from: msg.email,
    subject: 'Contact Us Numix',
    // text: msg.message,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, res) => {
    if(error) {
      return console.log(error);
    }
    else {
      console.log('Message %s sent: ', res);
    }
    transporter.close();
  });

  return {result: 'ok'};
}

const handler = { create, detail, login, chatting, follower, info, mail }
module.exports = recv => handler[recv.type](recv.data)