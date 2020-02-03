import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User'

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);    // get connection info from database.js config file

    models.map(model => model.init(this.connection));   // connect and map models to each table
  }
}

export default new Database();