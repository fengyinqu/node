/**
 * Created by MI177 on 2014/11/5.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var schema = Schema({
    name:String,
    password:String,
    sex:Number,
    email:String,
    phone:String,
    address:{province:String,city:String, street:String}
});
//加密
schema.methods.encryptPassword=function(){
   this.password=crypto.createHash("md5").update(this.password).digest("base64");
}
schema.methods.returnencryptPassword=function(password){
   return crypto.createHash("md5").update(password).digest("base64");
}
schema.methods.sayname=function(){
    console.log(this.name);
}
//console.log(schema);

//这么写出错  Cannot set property 'saypwd' of undefined
//schema.property.saypwd=function(){
//    console.log(this.pwd);
//}

//往mongose中注册model
mongoose.model('Users',schema);


