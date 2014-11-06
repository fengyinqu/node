/**
 * Created by MI177 on 2014/11/5.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = Schema({
    OpenId:String,
    TemplateId:Number,
    OrderId:Number,
    ShareType:Number,
    IsShared:Number,
    ShareText:String,
    Details:{Index:Number,PicPath:String}
});

//往mongose中注册model
mongoose.model('OrderShare',schema);


