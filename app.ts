import { Sequelize, DataTypes, Dialect } from "sequelize";

type Args = {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
  dialect: Dialect;
};

export async function getSequelize({
  database,
  username,
  password,
  host,
  port,
  dialect,
}: Args) {
  const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    port,
    logging: false,
  });

  const User = sequelize.define(
    "User",
    {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    },
    {
      // Other model options go here
    }
  );

  await User.sync();

  return { sequelize, User };
}
