const { Model } = require('sequelize');

//Model for the Courses Table
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {};
  Course.init({
    title: {type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:"Must have a valid Title name"},
            notNull:{msg:'Title is required'},
        }
    },
    description: {type:DataTypes.TEXT,
        allowNull:false,
        validate:{
            notEmpty:{msg:"Must have a valid description"},
            notNull:{msg:'Description is required'},
        }
      },
      estimatedTime: {type:DataTypes.STRING
      },
      materialsNeeded: {type:DataTypes.STRING
      },  
  }, {
    sequelize,
    modelName: 'Course',
  });
  //creates a association with the Users table
  Course.associate =(models)=>{
      Course.belongsTo(models.User,{
        foreignKey:{
          fieldName: "userId"
        }
    });
  }
  return Course;
};