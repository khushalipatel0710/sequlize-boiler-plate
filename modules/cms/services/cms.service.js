const {
  findById,
  create,
  update,
  deleteOne,
  findByName,
  getList,
} = require("../repositories/cms.repositories");

exports.getListOfCms = async (userId, paginatedRequest, query, options) => {
  return  new Promise((resolve, reject) => {
    getList(userId, paginatedRequest, query, {
      ...options,
    })
      .then((data) => {
          resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

exports.getCmsById = async (id) => {
  return await new Promise((resolve,reject)=>{
    findById({id})
    .then((data) => {
        resolve(data);
    })
    .catch((err) => {
      console.log("err", err);
      reject(err);
    });
});
};
  
exports.getCmsByName = async (name) => {
  return await new Promise((resolve,reject)=>{
    findByName({ title: name })
    .then((data) => {
      resolve(data)
    })
    .catch((err) => {
      // console.log("err", err);
      reject(err);
    });
});
};
  

exports.updateCms = async (data, id) => {
  console.log("data",data);
    return await new Promise((resolve,reject)=>{
      update(data,id)
      .then((data) => {
          resolve(data);
      })
      .catch((err) => {
        console.log("err", err);
        reject(err);
      });
  });
  };

exports.deleteCms = async (id) => {
  return await new Promise((resolve,reject)=>{
    deleteOne({id})
    .then((data) => {
        resolve(data);
    })
    .catch((err) => {
      console.log("err", err);
      reject(err);
    });
});
};

exports.createCms = async (data, userId) => {
    return await new Promise((resolve,reject)=>{
    create(data)
    .then((data) => {
        resolve(data);
    })
    .catch((err) => {
      console.log("err", err);
      reject(err);
    });
});
};
