const sequelizePaginate = require("sequelize-paginate");
module.exports = function (sequelize, DataTypes) {
  const studentsData = sequelize.define(
    "studentsData",
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      studentId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      GRNo: {
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
      class: {
        type: DataTypes.STRING(255),
        defaultValue: "",
      },
      batch: {
        type: DataTypes.STRING(255),
        defaultValue: "2022-2023",
      },
      stream: {
        type: DataTypes.STRING(255),
        defaultValue: "BE",
      },
    },
    {
      timestamps: true,
    }
  );
  // Don't Change This line of code
  studentsData.associate = function (models) {
    studentsData.belongsTo(models.university, {
      foreignKey: {
        name: "universityId",
      },
      as: "university",
    });
    models.university.hasOne(studentsData, {
      foreignKey: {
        name: "id",
      },
      as: "student_Data",
    });
    studentsData.belongsTo(models.students, {
      foreignKey: {
        name: "studentId",
      },
      as: "student_meta",
    });
  };
  sequelizePaginate.paginate(studentsData);
  return studentsData;
};
