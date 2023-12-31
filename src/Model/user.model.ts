
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';

class User extends Model {
  public id! : number;
  public name!: string;
  public email!: string;
  public password! : string;
  public balance! : number;
  
} 

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  }
}, {
  sequelize,
  modelName: 'User',
  timestamps: true
});


export default User;
