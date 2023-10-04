const sequelizePaginate = require("sequelize-paginate");
const db = require("./index");
module.exports = function (sequelize, DataTypes) {
  const students = sequelize.define(
    "students",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      studentname: {
        allowNull: false,
        type: DataTypes.STRING(45),
      },
      phoneNumber: {
        allowNull: true,
        type: DataTypes.STRING(45),
      },
      studentDataId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      universityId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      email: {
        type: DataTypes.STRING(50),
        defaultValue: "",
      },
      password: {
        type: DataTypes.STRING(255),
        defaultValue: "",
      },
    },
    {
      timestamps: true,
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["username", "phone_number", "email"],
        },
      ],
    }
  );
  // Don't Change This line of code
  students.associate = function (models) {
    students.belongsTo(models.studentsData, {
      foreignKey: {
        name: "studentDataId",
        allowNull: true,
      },
      as: "studentData",
    });
    models.studentsData.hasOne(students, {
      foreignKey: {
        name: "id",
        allowNull: true,
      },
      as: "students",
    });
  };
  sequelizePaginate.paginate(students);
  return students;
};
