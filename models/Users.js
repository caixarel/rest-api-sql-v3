const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:"Must have a valid First name"}
        }
    },
    lastName: {type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:"Must have a valid Last name"}
        }
      },
      emailAddress: {type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:{msg:"Must have a valid email"}
        }
      },
    password: {type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:"Must have a valid Last name"},
            notNull:{msg:'A password is required'},
            len:{
                args:[8,20],
                msg:'The password shoud be betwwen 8 and 20 letters'
            }
        }
      }  
  }, {
    sequelize,
    modelName: 'User',
  });
  User.associate = (models)=>{
      User.hasMany(models.Course);
  }
  return User;
};