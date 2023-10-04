const { where } = require("underscore");
const DB = require("../../../models/index");
const studentDataModel = DB["studentsData"];
const { Op } = require("sequelize");
const universityModel = DB["university"];
const studentModel = DB["students"];

//table A->B , B->c, ==> A->c
exports.getData1 = async () => {
  try {
    const user_data = await studentDataModel.findOne({
      include: {
        model: universityModel,
        as: "university",
        include: {
          model: studentModel,
          as: "students_details",
        },
      },
    });
    console.log("user_data....", user_data);
    return user_data;
  } catch (error) {
    console.log(error);
    return "";
  }
};

//table A -> B , A-> C but B !-> C
exports.getData = async () => {
  try {
    const user_data = await studentDataModel.findOne({
      include: [
        {
          model: universityModel,
          as: "university",
        },
        {
          model: studentModel,
          as: "student_meta",
        },
      ],
    });
    console.log("user_data....", user_data);
    return user_data;
  } catch (error) {
    console.log(error);
    return "";
  }
};

//table A->B , B->A
exports.getData2 = async () => {
  try {
    const user_data = await studentDataModel.findOne({
      include: {
        model: studentModel,
        as: "student_meta",
        //for this schema as = student_meta or students because of all thing is connected alternating we can create only one relation in one table
      },
    });
    console.log("user_data....", user_data);
    return user_data;
  } catch (error) {
    console.log(error);
    return "";
  }
};

exports.getUsers = async () => {
  try {
    const user_data = await studentDataModel.findOne({
      include: {
        model: studentModel,
        as: "student_meta",
      },
    });
    console.log("user_data....", user_data);
    return user_data;
  } catch (error) {
    console.log(error);
    return "";
  }
};
