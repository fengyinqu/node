/**
 * Created by MI177 on 2014/11/5.
 */
//mongoose中的model，逻辑上来说类似于MVC中的M层，具有部分数据操作能力
//而  以  model 创建的entity，也有部分操作数据库的能力
//例
//var Cat = mongoose.model('Cat', { name: String });
//var kitty = new Cat({ name: 'Zildjian' });
//kitty.save(function (err) {
//    if (err) // ...
//        console.log('meow');
//});
    //为了分层清晰，不建议在model中操作数据 Cat为model,kitty为entity
    //个人把entity的操作封装在公用的DaoBase中。
var mongoose = require('mongoose');
var config = require('../config');
var fs = require('fs');
mongoose.connect(config.connectionstring);
var db = mongoose.connection;

db.on('error', function(err){
    console.error('connect to %s error: ', config.connectionstring, err.message);
    process.exit(1);
});

db.once('open', function () {
    console.log('%s has been connected.', config.connectionstring);
});

//以上是mongoose API

//向 以上是mongoose 注册model
//并保存该model 到 当前模块
var models_path = __dirname + '/../models/mapping';
fs.readdirSync(models_path).forEach(function (file) {
    require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    console.log(modelName);
    exports[modelName] = mongoose.model(modelName);
});




//var Cat = mongoose.model('Cat', { name: String });
//var kitty = new Cat({ name: 'Zildjian' });
//kitty.save(function (err) {
//    if (err) // ...
//        console.log('meow');
//});
