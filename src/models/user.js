import { Model, DataTypes} from 'sequelize'


export default async function ({ sequelize }) {
    class User extends Model {}

    User.init({

        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: {
                    args: [2, 50],
                    msg: 'Invalid length for username!' 
                },
            }
        },
        user_contact: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^998[389][0123456789][0-9]{7}$/,
                    msg: 'Invalid uz contact!'
                }
            }

        },

        user_gender:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: {
                    args: [['male', 'female']],
                    msg: 'Invalid gender. The value must be either male or femal!'
                }
            } 
        },

        user_age: {
            type: DataTypes.INTEGER,
            validate: {
                max: 150,
                min: 1
            }
        } 
    }, {
        tableName: 'users',
        modelName: 'User',
        updatedAt: 'user_updated_at',
        createdAt: 'user_created_at',
        underscored: true,
        sequelize
    })
}