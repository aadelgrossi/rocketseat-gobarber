import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User'
import File from '../app/models/File'
import Appointment from '../app/models/Appointment'

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);    // get connection info from database.js config file

    models
      .map(model => model.init(this.connection))   // connect and map models to each table
      .map(model => model.associate && model.associate(this.connection.models)); // call associate function when it is present in model
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useFindAndModify: true
      }
    )
  }
}

export default new Database();