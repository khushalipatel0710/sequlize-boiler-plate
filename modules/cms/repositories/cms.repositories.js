const DB = require("../../../models/index");
const UserModel = DB['User']
const cmsModel = DB['cms']
exports.findById = async (id) => {
  return await new Promise((resolve,reject)=>{
    cmsModel.findOne({ 
      attributes:["id", "url","description","title"],
      where:id
    }).then((data) => {
      resolve(data)
    })
    .catch((err) => {
      console.log("err", err);
      reject(err);
    });
});
};
exports.findByName = async (data) => {
  console.log("data",data);
  return await new Promise((resolve, reject) => {
    cmsModel
      .findOne({
        attributes: ["id", "url","description","title"],
        where: data,
      })
      .then((data) => {
       resolve(data)
      })
      .catch((err) => {
        reject(err);
      });
  });
};
exports.create = async (data) => {
  return await new Promise((resolve,reject)=>{
    cmsModel.create(data).then((data) => {
      resolve(data);
    })
    .catch((err) => {
      console.log("err", err);
      reject(err);
    });
});
};


exports.update = async (data,id) => {
  return await new Promise((resolve,reject)=>{
    cmsModel.update(data,
      { where:{id : id}
      },{new : true}).then((data) => {
     resolve(data);
  })
    .catch((err) => {
      console.log("err", err);
      reject(err);
    });
});
};


exports.deleteOne = async (id) => {
  return await new Promise((resolve,reject)=>{
    cmsModel.destroy({ 
      where:id
    }).then((data) => {
     resolve(data);
    })
    .catch((err) => {
      console.log("err", err);
      reject(err);
    });
});
};

exports.getList = async (userId, paginatedRequest, query, options) => {
  return  new Promise((resolve, reject) => {
    const { limit, page } = paginatedRequest;
    delete query.page;
    delete query.limit;
    const options = {
      attributes: ["id", "url", "title"],
      page: Number(page), // Default 1
      paginate: Number(limit), // Default 25
    };
    cmsModel
      .paginate(options)
      .then((data) => {
         resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
