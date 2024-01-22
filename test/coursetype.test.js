const request = require("supertest");
const app = require("../app");
const { dbConnection, dbDisconnection } = require("../config/db");

//metti beforeall e after all che effettuano connessione al mockDb

// beforeAll(() => {
//   dbConnection();
// });

afterAll(() => {
  dbDisconnection();
});

// describe("descrive cosa stiamo testando", () => {
//   //dove vanno inseriti tutti i test che vogliamo effettuare
//   it("test individuale");
//   it("crea doc courseType");

//   //todo method per far passare metodo
// });

describe("courseType requests", () => {
  describe("POST", () => {
    describe("given a name", () => {
      //deve salvare nome nel db
      //deve rispondere con ogg json contenente id e nome
      // it("should respond with a json obj which contains id and name", async () => {
      //   const response = await request(app).post("/api/coursetype").send({
      //     name: "name",
      //   });
      //   expect(response.body._id).toBeDefined
      //   expect(response.body.name).toBeDefined
      // });
      //deve rispondere con 200
      it("should respond with a 201 status code", async () => {
        const response = await request(app).post("/api/coursetype").send({
          name: "name",
        });
        expect(response.statusCode).toBe(201);
      });
    });
    //deve rispodnere codice 500
    describe("when the name is missing", () => {
      it("should respond with a 500 status code", async () => {
        const response = await request(app).post("/api/coursetype").send({});
        expect(response.statusCode).toBe(500);
      });
    });
  });
  // describe("PATCH");
  // describe("DELETE");
  // describe("Get all course types");
  // describe("get one course type");
});
