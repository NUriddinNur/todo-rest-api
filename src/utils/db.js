import {Sequelize } from 'sequelize'
import models from '../models/index.js'


const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'postgres',
    database: 'look',
    host: 'localhost',
    password: 1234,
    port: 5432 + '',
    logging: false
})


export default async function() {
    try{
        await sequelize.authenticate()
        console.log('Connected to db!')

        // load models
        await models({ sequelize })
        console.log('Models are loaded')

        
        // sync models
        sequelize.sync({ alter: true })
        console.log('Models are syncronized!')

        return sequelize
    }catch(error) {
        console.log('Database error: ' + error.message)
    }
}