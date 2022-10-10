import supertest from "supertest";
import app from "./app";
import { prismaMock } from "./lib/prisma/client.mock";

const req = supertest(app);

test("GET /planets", async () => {
    const planets = [
        {
            id: 1,
            name: "Mercury",
            description: null,
            diameter: 1234,
            moons: 12,
            createdAt: "2022-09-13T11:03:03.185Z",
            updatedAt: "2022-09-13T11:03:14.767Z",
        },
        {
            id: 2,
            name: "Venus",
            description: null,
            diameter: 5678,
            moons: 2,
            createdAt: "2022-09-13T11:04:59.928Z",
            updatedAt: "2022-09-13T11:04:24.483Z",
        },
    ];

    // @ts-ignore
    prismaMock.planet.findMany.mockResolvedValue(planets);

    const res = await req
        .get("/planets")
        .expect(200)
        .expect("Content-Type", /application\/json/);

    expect(res.body).toEqual(planets);
});