// import redis from "async-redis";
// import { GenericContainer } from "testcontainers";

// describe("Redis", () => {
//   let container: GenericContainer;
//   let redisClient: ;

//   beforeAll(async () => {
//     container = await new GenericContainer("redis")
//       .withExposedPorts(6379)
//       .start();

//     redisClient = redis.createClient(
//       container.getMappedPort(6379),
//       container.getHost()
//     );
//   });

//   afterAll(async () => {
//     redisClient && (await redisClient.quit());
//     container && (await container.stop());
//   });

//   it("works", async () => {
//     await redisClient.set("key", "val");
//     expect(await redisClient.get("key")).toBe("val");
//   });
// });
