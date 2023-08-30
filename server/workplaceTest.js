const mongoose = require("mongoose");
const assert = require("assert");
const request = require("supertest"); // Supertest is used to make HTTP requests for testing

const app = require("./index"); // Import your Express app instance (assuming your index.js is in the root directory)
const Workplace = require("./models/workplaceModel");

describe("Workplace API", () => {
  before(async () => {
    // Connect to a test database
    await mongoose.connect("mongodb+srv://alekseigolovanov89:<password>@saukko-dev.v6pivlm.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  after(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
  });

  describe("GET /api/work/workplace/:id", () => {
    it("should get a workplace by ID", async () => {
      // Create a sample workplace for testing
      const sampleWorkplace = {
        workplaceId: new mongoose.Types.ObjectId(),
        businessId: "12345",
        name: "Sample Workplace",
        customerId: "67890",
      };
      await Workplace.create(sampleWorkplace);

      // Perform a GET request to fetch the sample workplace
      const response = await request(app).get(
        `/api/work/workplace/${sampleWorkplace.workplaceId}`
      );

      // Assert that the response has the expected name
      assert.strictEqual(response.body.name, sampleWorkplace.name);
    });
  });
});