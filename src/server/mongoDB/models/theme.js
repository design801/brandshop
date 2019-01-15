const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema ({
    version: {type: String, default: ""},
    theme: {type: String, default: ""},
});

const contentSchema = {
    id: {type: String, default: ""},
    img: {type: String, default: ""},
    imgMobile: {type: String, default: ""},
    link: {type: String, default: ""},
};

const moreSchema = {
    desc: {type: String, default: ""},
    descMobile: {type: String, default: ""},
    linkDesc: {type: String, default: ""},
    linkDescMobile: {type: String, default: ""},
    link: {type: String, default: ""},
};

const brandSchema = {
    id: {type: String, default: ""},
    title: {type: String, default: ""},
    subTitle: {type: String, default: ""},
    bg: {type: String, default: ""},
    bgMobile: {type: String, default: ""},
    pattern: {type: Number, default: 0},
    more: moreSchema,
    content: [contentSchema],
};

const aboutSchema = {
    img: {type: String, default: ""},
};

const introSchema = {
    img: {type: String, default: ""},
    imgMobile: {type: String, default: ""},
};

const mainSchema = {
    img: {type: String, default: ""},
    imgMobile: {type: String, default: ""},
};

const archiveSchema = {
    title: {type: String, default: ""},
    img: {type: String, default: ""},
    link: {type: String, default: ""},
    caption: {type: String, default: ""},
    isLink: {type: Boolean, default: true},
};

const themeSchema = new mongoose.Schema ({
    title: {type: String, default: ""},
    desc: {type: String, default: ""},
    sort: {type: Number, default: 0}, 
    id: String,
    main: mainSchema,
    intro: introSchema,
    archive: archiveSchema,
    brand: [brandSchema],
    about: [aboutSchema],
    aboutMobile: [aboutSchema],
    isDisplay: Boolean,
});

const reportSchema = new mongoose.Schema ({
    theme: {type: String, default: ""},
    brand: {type: String, default: ""},
    content: {type: String, default: ""},
    date: {type: Number, default: Date.now} // 현재 날짜를 기본값으로 지정
});

const accountSchema = new mongoose.Schema ({
    id: {type: String, default: ""},
    passwd: {type: String, default: ""},
});

module.exports = { 
    adminSchema:    mongoose.model('admin', adminSchema),
    themeSchema:    mongoose.model('theme', themeSchema),

    mainSchema:     mongoose.model('main', mainSchema),
    introSchema:    mongoose.model('intro', introSchema),
    archiveSchema:  mongoose.model('archive', archiveSchema),
    aboutSchema:    mongoose.model('about', aboutSchema),
    brandSchema:    mongoose.model('brand', brandSchema),
    moreSchema:     mongoose.model('more', moreSchema),
    contentSchema:  mongoose.model('content', contentSchema),

    reportSchema:   mongoose.model('report', reportSchema),

    accountSchema:  mongoose.model('account', accountSchema),
};