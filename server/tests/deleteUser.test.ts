import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/index'; // Adjust the import according to your project structure
import userModel from '../src/models/userModel'
import evaluationModel from '../src/models/evaluatuionModel'
import workplaceModel from '../src/models/workplaceModel'

describe('DELETE /users/:id', () => {
  let mongoServer: MongoMemoryServer;
  let userId: mongoose.Types.ObjectId;
  let evaluationId: mongoose.Types.ObjectId;
  let workplaceId: mongoose.Types.ObjectId;
  let server: any;
  let PORT: 5002;

  //TODO: ADD role and password

  beforeAll(async () => {
    // Start in-memory MongoDB server
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);

    // Create a user, evaluation, and workplace for testing
    const user = new userModel({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });
    await user.save();
    userId = user._id;

    const evaluation = new evaluationModel({
      customerId: userId,
      teacherId: userId,
      supervisorIds: [userId],
      degreeId: new mongoose.Types.ObjectId(),
      workplaceId: new mongoose.Types.ObjectId(),
      startDate: new Date(),
      endDate: new Date(),
      extensionEndDate: new Date(),
      workTasks: 'tasks',
      workGoals: 'goals',
      completed: false,
      status: 1,
      regulationDate: new Date(),
      transitionEnds: new Date(),
      validFrom: new Date(),
      expiry: new Date(),
      units: [],
    });
    await evaluation.save();
    evaluationId = evaluation._id;

    const workplace = new workplaceModel({
      businessId: '123456',
      name: 'Test Workplace',
      supervisors: [userId],
      departments: [{ name: 'Test Department', supervisors: [userId] }],
      degreeId: new mongoose.Types.ObjectId(),
      regulationDate: new Date(),
      transitionEnds: new Date(),
      validFrom: new Date(),
      expiry: new Date(),
      units: [],
    });
    await workplace.save();
    workplaceId = workplace._id;

    // Find an available port and start the server
    process.env.PORT = PORT.toString();
    server = app.listen(PORT);
  });

  afterAll(async () => {
    // Disconnect and stop the in-memory MongoDB server and the server
    await mongoose.disconnect();
    await mongoServer.stop();
    server.close();
  });

  it('should delete the user and associated evaluations and workplaces', async () => {
    const res = await request(server).delete(`/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.details.userDeleted).toBe(1);

    // Verify that the user is deleted
    const user = await userModel.findById(userId);
    expect(user).toBeNull();

    // Verify that the evaluation is deleted
    const evaluation = await evaluationModel.findById(evaluationId);
    expect(evaluation).toBeNull();

    // Verify that the workplace is deleted
    const workplace = await workplaceModel.findById(workplaceId);
    expect(workplace).toBeNull();
  });
});
