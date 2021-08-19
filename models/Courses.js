const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Course.init({
    title: {type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:"Must have a valid Title name"}
        }
    },
    description: {type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:"Must have a valid description"}
        }
      },
      estimatedTime: {type:DataTypes.STRING,
        allowNull:true,
      },
      materialsNeeded: {type:DataTypes.STRING,
        allowNull:true,
      },  
  }, {
    sequelize,
    modelName: 'Course',
  });

  Course.associate =(models)=>{
      Course.belongsTo(models.User,{
        foreignKey:{fieldName: "userId"},
    })
  }
  return Course;
};