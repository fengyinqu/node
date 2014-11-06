/**
 * Created by MI177 on 2014/11/5.
 */
// var require("11");

//所有引入的mongoose model
var models = require('./../models');
var getDaoModel = require('./DaoBase');
var Users=models.Users;


//这里有个问题，靠NODE引用的话，只能实例化一个对象。
//设exports 为一个对象数组的话略不值。
//所以不用方法调用，如果要调的话，直接设置该DAO的属性
var UsersDao = getDaoModel(Users);
UsersDao.Check=function(doc,callback){
//此处简直不能直视，暂时这么写吧……
   this.inidoc(doc);
   doc.password= this.doc.returnencryptPassword(doc.password);
   console.error(doc);
   this.findOne(doc,callback);
};

console.log(UsersDao);
module.exports = UsersDao;

//
//var newobj=new Users();
//newobj.save(function (err, fluffy) {
//    if (err) return console.error(err);
//    fluffy.speak();
//});
//
//Users.find(function (err, kittens) {
//    if (err) return console.error(err);
//    console.log(kittens)
//})
