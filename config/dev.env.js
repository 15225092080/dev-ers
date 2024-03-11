"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // http://127.0.0.1:7300/mock/5e82ebcb1a2d832330ccd1ad
    API_ROOT_PLATFORM: '"/system/"',
    API_ROOT_schedule: '"/schedule/"',
    API_ROOT_ERS: '"/entRatingWeb/"',
    API_ROOT_CRS_PER: '"/personCreditWeb/"'
});
