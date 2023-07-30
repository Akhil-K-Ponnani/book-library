import chai from "chai";
import { server } from "../src/server.js";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();

let book, book2;

describe("Book", () => {
  describe("POST /", () => {
    it("Should create a new book", (done) => {
      chai
        .request(server)
        .post("/api/v1/books")
        .send({
          title: `Test ${Math.random(3).toString()}`,
          pages: "12",
          year: 2023,
          language: "Tamil",
          author: "ss",
          link: "https://google.com",
        })
        .end((err, res) => {
          book = res?.body?.data;
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.keys(["success", "data"]);
          res.body.should.have.nested.property("data.id");
          res.body.should.have.nested.property("data.title");
          res.body.should.have.nested.property("data.author");
          res.body.should.not.have.nested.property("data.imageLink");
          done();
        });
    });

    it("Should create a new book", (done) => {
      chai
        .request(server)
        .post("/api/v1/books")
        .send({
          title: `Test ${Math.random(3).toString()}`,
          pages: "12",
          year: 2023,
          language: "Tamil",
          author: "ss",
        })
        .end((err, res) => {
          book2 = res?.body?.data;
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.keys(["success", "data"]);
          res.body.should.have.nested.property("data.id");
          res.body.should.have.nested.property("data.title");
          res.body.should.have.nested.property("data.author");
          done();
        });
    });

    it("Should create a new book", (done) => {
      chai
        .request(server)
        .post("/api/v1/books")
        .send({
          title: `Test ${Math.random(3).toString()}`,
          pages: "12",
          year: 2023,
          language: "Tamil",
          author: "ss",
          notExist: "",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .post("/api/v1/books")
        .send({
          title: `Test ${Math.random(3).toString()}`,
          pages: "12",
          year: 2023,
          language: "Tamils",
          author: "ss",
          link: "https://google.com",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .post("/api/v1/books")
        .send({
          title: `Test ${Math.random(3).toString()}`,
          pages: "12",
          year: 2023,
          language: "Tamil",
          author: "ss",
          imageLink: "s",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .post("/api/v1/books")
        .send({
          title: `Test ${Math.random(3).toString()}`,
          pages: "12",
          year: 2023,
          language: "Tamil",
          author: "ss",
          link: "s",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .post("/api/v1/books")
        .send({
          title: book.title,
          pages: "12",
          year: 2023,
          language: "Tamil",
          author: "ss",
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("PUT /", () => {
    it("Should get an error", (done) => {
      chai
        .request(server)
        .put(`/api/v1/books/${book2?.id}`)
        .send({
          title: book.title,
          pages: "12",
          year: 2023,
          language: "Tamil",
          author: "ss",
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          done();
        });
    });

    it("Should updates existing book", (done) => {
      chai
        .request(server)
        .put(`/api/v1/books/${book?.id}`)
        .send({
          title: `Test ${Math.random(3).toString()}`,
          pages: "12",
          year: 2015,
          language: "Tamil",
          author: "ss",
          link: "https://google.com",
        })
        .end((err, res) => {
          book = res?.body?.data;
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.keys(["success", "data"]);
          res.body.should.have.nested.property("data.id");
          res.body.should.have.nested.property("data.title");
          res.body.should.have.nested.property("data.author");
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .put(`/api/v1/books/${book?.id}`)
        .send({
          title: `Test ${Math.random(3).toString()}`,
          pages: "12",
          year: 2023,
          language: "malayalam",
          author: "ss",
          link: "https://google.com",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .put(`/api/v1/books/${book?.id}`)
        .send({
          title: `Test ${Math.random(3).toString()}`,
          pages: "12",
          year: 2023,
          language: "Tamil",
          author: "ss",
          imageLink: "s",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .put(`/api/v1/books/${book?.id}`)
        .send({
          title: `Test ${Math.random(3).toString()}`,
          pages: "12",
          year: 2023,
          language: "Tamil",
          author: "ss",
          link: "s",
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("DELETE /", () => {
    it("Should get an error", (done) => {
      chai
        .request(server)
        .delete(`/api/v1/books/736373637`)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          done();
        });
    });

    it("Should deletes existing book", (done) => {
      chai
        .request(server)
        .delete(`/api/v1/books/${book2?.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("success");
          res.body.should.not.have.property("data");
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .delete(`/api/v1/books/${book2?.id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("GET /", () => {
    it("Should get maximum 30 books", (done) => {
      chai
        .request(server)
        .get("/api/v1/books")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.keys(["success", "data", "total"]);
          res.body.data.length.should.be.within(0, 30);
          done();
        });
    });

    it("Should get maximum 50 books", (done) => {
      chai
        .request(server)
        .get("/api/v1/books")
        .query({ limit: 1, page: 50 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.keys(["success", "data", "total"]);
          res.body.data.length.should.be.within(0, 50);
          done();
        });
    });

    it("Should throw exception", (done) => {
      chai
        .request(server)
        .get("/api/v1/books")
        .query({ limit: 0, page: 0 })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });

    it("Should get maximum one book", (done) => {
      chai
        .request(server)
        .get("/api/v1/books")
        .query({ limit: 1, page: 1 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.keys(["success", "data", "total"]);
          res.body.data.length.should.be.within(0, 1);
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .get("/api/v1/books")
        .query({ limit: 1, page: 2, language: "english" })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });

    it("Should get books with language Malayalam", (done) => {
      chai
        .request(server)
        .get("/api/v1/books")
        .query({ limit: 1, page: 2, language: "Malayalam" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.keys(["success", "data", "total"]);
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .get("/api/v1/books")
        .query({ limit: 1, page: 2, year: 1400 })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .get("/api/v1/books")
        .query({ limit: 1, page: "test", year: 1400 })
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("array");
          done();
        });
    });

    it("Should get books with year 2023", (done) => {
      chai
        .request(server)
        .get("/api/v1/books")
        .query({ limit: 1, page: 2, year: 2023 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.keys(["success", "data", "total"]);
          done();
        });
    });
  });

  describe("GET ONE /", () => {
    it("Should get one book", (done) => {
      chai
        .request(server)
        .get(`/api/v1/books/${book?.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.keys(["success", "data"]);
          res.body.should.have.nested.property("data.id");
          res.body.should.have.nested.property("data.title");
          res.body.should.have.nested.property("data.author");
          done();
        });
    });

    it("Should get an error", (done) => {
      chai
        .request(server)
        .get(`/api/v1/books/${book2?.id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });

    it("Should throw exception", (done) => {
      chai
        .request(server)
        .get(`/api/v1/books/12121212`)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
