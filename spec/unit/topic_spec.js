const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done) => {
    this.topic;
    this.post;
    this.user;
    sequelize.sync({force: true}).then((res) => {
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        })
      })
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