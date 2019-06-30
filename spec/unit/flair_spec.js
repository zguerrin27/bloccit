const sequelize = require("../../src/db/models/index").sequelize;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done) => {
    this.flair;
    sequelize.sync({force: true}).then((res) => {
      Flair.create({
        name: "They call me the Flair steppa",
        color: "Green"
      })
      .then((flair) => {
        this.flair = flair;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {
    it("should create a flair with correct parameters + store in DB", (done) => {
      Flair.create({
        name: "They call me the Flair steppa",
        color: "green"
      })
      .then((flair) => {
        expect(flair.name).toBe("They call me the Flair steppa");
        expect(flair.color).toBe("green");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it("should not create a flair with a missing name or color", (done) => {
      Flair.create({
        name: "They call me the Flair steppa"
      })
      .then((flair) => {
        // skippppeddddddd
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Flair.color cannot be null");
        done();
      })
    });
  });

})