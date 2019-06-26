const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;

        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
  });

  describe("#create()", () => {
    it("should create a topic with correct parameters + store in DB", (done) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        expect(topic.title).toBe("Expeditions to Alpha Centauri");
        expect(topic.description).toBe("A compilation of reports from recent visits to the star system.");
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });
    it("should not create a topic with a missing title or description", (done) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri"
      })
      .then((topic) => {
        // skippppeddddddd
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    });
  });


  describe("#getPosts()", () => {
    it("should create a post and return the associated Posts", (done) => {
      this.topic.getPosts()  
      Post.create({
        title: "My second visit to Proxima Centauri b",
        body: "Guess what...MORE rocks.",
        topicId: this.topic.id
      })
      .then((post) => {
        expect(post.title).toContain("My second visit to Proxima Centauri b");
        done();
        })
    });
  });



}); // main 