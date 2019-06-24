const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/adverts/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advert = require("../../src/db/models").Advert;

describe("routes : adverts", () => {

  beforeEach((done) => {
    this.advert;
    sequelize.sync({force: true}).then((res) => {
     Advert.create({
       title: "JS Frameworks",
       description: "There is a lot of them"
     })
      .then((advert) => {
        this.advert = advert;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("GET /adverts", () => {
    it("should return a status code 200 and all adverts", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Adverts");
          expect(body).toContain("JS Frameworks");
          done();
      });
    });
  });

  describe("GET /topics/new", () => {
    it("should render a new advert form", (done) => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("New Advert");
        done();
      });
    });
  });

  describe("POST /adverts/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        title: "blink-182 songs",
        description: "What's your favorite blink-182 song?"
      }
    };

    it("should create a new advert and redirect", (done) => {
      request.post(options,
        (err, res, body) => {
          Advert.findOne({where: {title: "blink-182 songs"}})
          .then((advert) => {
            expect(res.statusCode).toBe(303);
            expect(advert.title).toBe("blink-182 songs");
            expect(advert.description).toBe("What's your favorite blink-182 song?");
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("GET /adverts/:id", () => {
    it("should render a view with the selected advert", (done) => {
      request.get(`${base}${this.advert.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("POST /adverts/:id/destroy", () => {
    it("should delete the advert with the associated ID", (done) => {
      Advert.findAll()
      .then((adverts) => {
        const advertCountBeforeDelete = adverts.length;
        expect(advertCountBeforeDelete).toBe(1);
        request.post(`${base}${this.advert.id}/destroy`, (err, res, body) => {
          Advert.findAll()
          .then((adverts) => {
            expect(err).toBeNull();
            expect(adverts.length).toBe(advertCountBeforeDelete - 1);
            done();
          })
        });
      });
    });
  });

  describe("GET /adverts/:id/edit", () => {
    it("should render a view with an edit advert form", (done) => {
      request.get(`${base}${this.advert.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Advert");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });
  });

  describe("POST /adverts/:id/update", () => {
    it("should update the advert with the given values", (done) => {
       const options = {
          url: `${base}${this.advert.id}/update`,
          form: {
            title: "JavaScript Frameworks",
            description: "There are a lot of them"
          }
        };
        request.post(options,
          (err, res, body) => {
          expect(err).toBeNull();
          Advert.findOne({
            where: { id: this.advert.id }
          })
          .then((advert) => {
            expect(advert.title).toBe("JavaScript Frameworks");
            done();
          });
        });
    });
  });

}); // main