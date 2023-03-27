import { PostgreSqlContainer } from "testcontainers";
import { getSequelize } from "./app";

it("should connect and return a query result", async () => {
  const container = await new PostgreSqlContainer().start();

  const { sequelize: s, User } = await getSequelize({
    database: container.getDatabase(),
    username: container.getUsername(),
    password: container.getPassword(),
    host: container.getHost(),
    port: container.getPort(),
    dialect: "postgres",
  });

  await s.authenticate();

  await User.create({
    firstName: "John",
    lastName: "Hancock",
  });

  const users = await User.findAll();

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

  await s.close();
  await container.stop();
});
