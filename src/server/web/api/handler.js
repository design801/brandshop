const crypto = require('../../utils/crypto')
const trustIP = require('../../utils/trustIP')
const urlencode = require('urlencode')

const router = { admin: require('./admin'), history: require('./history'), user: require('./user'), wallet: require('./wallet'), blog: require('./blog'), community: require('./community') }
const permission = {}

const toJson = data => JSON.parse(data)

module.exports = async(req, res) => {
  try {
    //const recv = await crypto.decipher(req.params.msg.toString('hex'));
    //console.log('\nrecv : ' + req.params.id + ' => ' + recv);
    const recv = req.params.msg;
    console.log(req.params.id);
    console.log(recv);

    const result = await router[req.params.id](toJson(recv));
    //res.json(await crypto.encryption(result));
    res.json(JSON.stringify(result));
    console.log('\nsend : ' + JSON.stringify(result));
  } catch (e) {
    //res.json(await crypto.encryption({result: e.message}));
    res.json({result: e.mseeage});
  }
}