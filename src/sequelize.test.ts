import { MySqlContainer, PostgreSqlContainer } from "testcontainers";
import { getSequelize } from "./sequelize";

describe("should connect and return a query result", () => {
  it("works with postgres", async () => {
    // Create a container using testcontainers
    const container = await new PostgreSqlContainer().start();

    // Use the details from the container, create the database client
    const { client, User } = await getSequelize({
      database: container.getDatabase(),
      username: container.getUsername(),
      password: container.getPassword(),
      host: container.getHost(),
      port: container.getPort(),
      dialect: "postgres",
    });

    // Check if you have access to the database
    await client.authenticate();

    // Create a user
    await User.create({
      firstName: "John",
      lastName: "Hancock",
    });

    // Get all users
    const users = await User.findAll();

    // Check that the expected user is present
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: "John",
          lastName: "Hancock",
          id: 1,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ])
    );

    // Close connections
    await client.close();
    await container.stop();
  }, 25000);

  it("works with mysql", async () => {
    // Create a container using testcontainers
    const container = await new MySqlContainer().start();

    // Use the details from the container, create the database client
    const { client, User } = await getSequelize({
      database: container.getDatabase(),
      username: container.getUsername(),
      password: container.getUserPassword(),
      host: container.getHost(),
      port: container.getPort(),
      dialect: "mysql",
    });

    await client
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((error) => {
        console.error("Unable to connect to the database: ", error);
      });

    // Check if you have access to the database
    const auth = await client.authenticate();

    // Create a user
    await User.create({
      firstName: "John",
      lastName: "Hancock",
    });

    // Get all users
    const users = await User.findAll();

    // Check that the expected user is present
    expect(users).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          firstName: "John",
          lastName: "Hancock",
          id: 1,
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ])
    );

    // Close connections
    await client.close();
    await container.stop();
  }, 25000);
});
