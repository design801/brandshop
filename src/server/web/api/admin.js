const db = require('../../mongoDB/schema')
const moment = require('moment')
const { Map } = require('immutable')

const create = async(msg) => { 

  console.log(msg.title);
  console.log(msg.desc);
  console.log(msg.id);

  if( msg.title === "" || msg.desc == "" || msg.id === "") return {result: 'empty'};

  if( await db.themeSchema.findOne({id: msg.id}) !== null ) return {result: 'no'};

  // 새 Theme 인스턴스를 생성합니다.
  const theme = new db.themeSchema({
    title:      msg.title, 
    desc:       msg.desc,
    sort:       0,
    id:         msg.id, 
    main:       new db.mainSchema(),
    intro:      new db.introSchema(),
    archive:    new db.archiveSchema(),
    brand:      [],
    about:      [],
    isDisplay:  true,
  });
  await theme.save(); // 데이터베이스에 등록합니다.

  return {result: 'ok', theme: theme};
}

const find = async(msg) => {

  const themes = await db.themeSchema.find().exec();

  return {result: 'ok', themes: themes};
}

const findID = async(msg) => {

  const theme = await db.themeSchema.findOne({id: msg.id});

  if(theme === null) return {result: 'no'};

  return {result: 'ok', theme: theme};
}

const findTheme = async(msg) => {
  
  const admins = await db.adminSchema.find().exec();

  const theme = await db.themeSchema.findOne({id: admins[0].theme});

  if(theme === null) return {result: 'no'};

  return {result: 'ok', theme: theme};
}

const findArchive = async(msg) => {
  const query = {isDisplay: true};
  const themes = await db.themeSchema.find(query).sort({ sort: -1 }).exec();

  return {result: 'ok', themes: themes};
}

const changeTheme = async(msg) => {

  await db.adminSchema.findOneAndUpdate({version: 'admin'}, {$set: {theme: msg.id}}, {new: true});

  return findTheme(msg);
}

const updateTheme = async(msg) => {
  await db.themeSchema.findOneAndUpdate({id: msg.id}, {$set: {title: msg.title, desc: msg.desc, sort: msg.sort}}, {new: true});

  return findID(msg);
}

const bool = async(msg) => {

  const theme = await db.themeSchema.findOne({id: msg.id});

  if(theme === null) return {result: 'no'};

  await db.themeSchema.findOneAndUpdate({id: msg.id}, {$set: {isDisplay: !theme.isDisplay}}, {new: true});

  return find(msg);
}

const about = async(msg) => {
  const id = msg.id;
  const list = msg.list;

  console.log(list);

  const theme = await db.themeSchema.findOne({id: id});

  if(theme === null) return {result: 'no'};

  await db.themeSchema.findOneAndUpdate({id: id}, {$set: {about: list}}, {new: true});

  return {result: 'ok'};
}

const aboutMobile = async(msg) => {
  const id = msg.id;
  const list = msg.list;
  console.log(list);

  const theme = await db.themeSchema.findOne({id: id});

  if(theme === null) return {result: 'no'};

  await db.themeSchema.findOneAndUpdate({id: id}, {$set: {aboutMobile: list}}, {new: true});

  return {result: 'ok'};
}

const brand = async(msg) => {
  const id = msg.id;
  const list = msg.list;

  console.log(list);

  const theme = await db.themeSchema.findOne({id: id});

  if(theme === null) return {result: 'no'};

  await db.themeSchema.findOneAndUpdate({id: id}, {$set: {brand: list}}, {new: true});

  return {result: 'ok'};

  // console.log(msg.title);
  // console.log(msg.subTitle);
  // console.log(msg.pattern);
  
  // console.log(msg.more.desc);
  // console.log(msg.more.linkDesc);
  // console.log(msg.more.link);

  // console.log(msg.content[0].link);
  // console.log(msg.content[1].link);
  // console.log(msg.content[2].link);
}

const report = async(msg) => {
  // TODO : 가공 필요
  console.log('report');
  console.log(msg.theme);
  console.log(msg.date);

  const startDate = msg.date + '000000';
  const endDate = msg.date + '235959';

  const reports = await db.reportSchema.find({theme: msg.theme}).exec();

  // TODO : 시간에 따라 분리
  hash = Object.create(null);
  grouped = [];

  var brand = new Map();
  hashBrand = Object.create(null);
  groupedBrand = [];

  reports.forEach( (pp, i) => {
    //console.log(pp);
    const data = moment(pp.date).format('YYYYMMDDHHmmss');
    const key = moment(pp.date).format('HH');
    const brandKey = pp.brand + moment(pp.date).format('HH');
    //console.log(data);
    //console.log(key);
    //console.log(brandKey);

    if(startDate <= data && data <= endDate) {
      // if(!hash[key]) {
      //   hash[key] = { count: 0, time: key };
      //   grouped.push(hash[key]);
      // }
      // hash[key].count += 1;
      // console.log(hash[key]);

      if(!hashBrand[brandKey]) {
        hashBrand[brandKey] = { count: 0, brand: pp.brand, time: key };
        groupedBrand.push(hashBrand[brandKey]);
      }
      hashBrand[brandKey].count += 1;
      //console.log(hashBrand[key]);

      // if( brand.has(pp.brand) ) {

      // } else {
      //   brand.set(pp.brand, new Array());
      //   arr = brand.get(pp.brand);
      //   arr.push
      // }
    }
  });

  console.log('groupedBrand');
  console.log(groupedBrand);

  // console.log('c');

  // grouped.sort(function (a, b) {
  //   return b.time.localeCompare(a.time);
  // });

  // console.log('d');

  // console.log(grouped);

  // console.log('e');

  // console.log(brand);

  return {result: 'ok', data: groupedBrand};
}

const traffic = async(msg) => {
  console.log('traffic');
  console.log(msg.theme);
  console.log(msg.brand);
  console.log(msg.content);

  // 새 Report 인스턴스를 생성합니다.
  const report = new db.reportSchema({
    theme:      msg.theme, 
    brand:      msg.brand,
    content:    msg.content, 
  });
  await report.save(); // 데이터베이스에 등록합니다.

  return {result: 'ok'};
}

const archive = async(msg) => {
  console.log('archive');
  console.log(msg.id);
  console.log(msg.img);
  console.log(msg.link);
  console.log(msg.caption);
  console.log(msg.isLink);
  console.log(msg.title);

  const archiveData = new db.archiveSchema({
    title:      msg.title,
    img:        msg.img, 
    link:       msg.link,
    caption:    msg.caption,
    isLink:     msg.isLink,
  });

  await db.themeSchema.findOneAndUpdate({id: msg.id}, {$set: {archive: archiveData}}, {new: true});

  return findID(msg);
}

const loginAccount = async(msg) => {
  console.log('loginAccount');
  console.log(msg.id);
  console.log(msg.passwd);

  const account = await db.accountSchema.findOne({id: msg.id}).exec();

  if(account === null) return {result: 'noid'};

  if(account.passwd !== msg.passwd) return {result: 'nopasswd'};

  return {result: 'ok'};
}

const createAccount = async(msg) => {
  console.log('createAccount');
  console.log(msg.id);
  console.log(msg.passwd);

  const aa = await db.accountSchema.findOne({id: msg.id}).exec();

  if(aa.id === msg.id) return {result: 'no'};

  // 새 Account 인스턴스를 생성합니다.
  const account = new db.accountSchema({
    id:       msg.id, 
    passwd:   msg.passwd, 
  });
  await account.save(); // 데이터베이스에 등록합니다.

  return {result: 'ok'};
}

const findAccount = async(msg) => {
  console.log('findAccount');

  const accounts = await db.accountSchema.find().exec();

  return {result: 'ok', accounts: accounts};
}

const handler = { create, find, findID, findTheme, findArchive, changeTheme, bool, about, aboutMobile, brand, report, traffic, updateTheme, archive, loginAccount, createAccount, findAccount }
module.exports = recv => handler[recv.type](recv.data)