import { DataTypes, Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.NODE_ENV === "production"
    ? process.env.DB_URL
    : 'sqlite:dataBase.sqlite'
);

const Email = db.define("Emails", {
  address: {
    type: DataTypes.STRING,
    unique: true
  },
  validated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export {
  db,
  Email
};
