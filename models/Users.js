const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
//Model for the Users Table
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
        unique:true,
        validate:{
          notEmpty:{msg:"Must have a email"},
          isEmail:{msg:"Must have a valid email"},
          notNull:{msg:'email is required'},
        }
      },
    password: {type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{msg:"Must have a valid password"},
            notNull:{msg:'A password is required'},
            len:{
                args:[8,20],
                msg:'The password shoud be betwwen 8 and 20 letters'
            },
            set(val){
              const hashedPassword =bcrypt.hashSync(val,10);
              this.setDataValue('password',hashedPassword);
            }
        }
      }  ,
  }, {
    sequelize,
    modelName: 'User',
  });
  //creates a association with the Courses table
  User.associate = (models)=>{
      User.hasMany(models.Course,{
        foreignKey:{
          fieldName: "userId"
        },
    });
  }
  return User;
};