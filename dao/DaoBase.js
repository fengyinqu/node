/**
 * Created by MI177 on 2014/11/5.
 */


var parentobj={
    //cdo从官网拿来的
    "save":function(callback){
        if(this.doc){
            this.doc.save(callback);
        }
        else{
            throw("未初始化将sava的对象，请检查DAO的构造方法传参是否正确 应为（model,doc）")
        }
    },
//    "find":function(callback){
//        if(this.doc){
//            this.doc.find(callback)
//        }
//        else{
//            throw("未初始化将sava的对象，请检查DAO的构造方法传参是否正确 应为（model,doc）")
//        }
//    },

    "inidoc":function(doc){
        this.doc=new this.model(doc)
    },

    "create": function (doc,callback){
        this.model.create(doc, function (error) {
            if(error) return callback(error);
            return callback(doc);
        });
    },
    "findOne":function(doc,callback){
        this.model.findOne(doc, function(error, model){
            if(error) return callback(error,null);
            return callback(null,model);
        });
    },


    "getById":function (id, callback) {
        this.model.findOne({_id:id}, function(error, model){
            if(error) return callback(error,null);
            return callback(null,model);
        });
    },
    "getByQuery":function (query,fileds,opt,callback) {
        this.model.find(query, fileds, opt, function(error,model){
            if(error) return callback(error,null);

            return callback(null,model);
        });
    },
    "getAll": function (callback) {
        this.model.find({}, function(error,model){
            if(error) return callback(error,null);

            return callback(null, model);
        });
    },

    "delete":function (query, callback){
        this.model.remove(query, function(error){
            if(error) return callback(error);

            return callback(null);
        });
    },
    "update": function( conditions, update ,options, callback) {
        this.model.update(conditions, update, options, function (error) {
            if(error) return callback(error);
            return callback(null);
        });
    }

};

//
//function DaoBase (Model,doc){
//    this.model = Model;
//    if(doc){
//        this.doc=new Model(doc);
//    }
//}



function DaoBase (Model){
    this.model = Model;
}
DaoBase.prototype=parentobj;

function getDaoModel(Model){
    return new DaoBase(Model);
}

module.exports = getDaoModel;