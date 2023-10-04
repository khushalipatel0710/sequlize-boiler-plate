const sequelizePaginate = require("sequelize-paginate");
module.exports = function (sequelize, DataTypes) {
  const university = sequelize.define(
    "university",
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
      studentDataId: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      city: {
        allowNull: true,
        type: DataTypes.STRING(50),
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
    },
    {
      timestamps: true,
    }
  );
  // Don't Change This line of code
  university.associate = function (models) {
    university.belongsTo(models.students, {
      foreignKey: {
        name: "studentId",
        allowNull: true,
      },
      as: "students_details",
    });
  };
  sequelizePaginate.paginate(university);
  return university;
};
