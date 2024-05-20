import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import mongoManager from "../utils/mongo";
import Degree, { IDegree } from "../models/degreeModel";
import { fetchUnits } from "../utils/fetchUnits";
import mongoose, { isValidObjectId } from "mongoose";
import config from '../utils/config';

export async function getDegreeById(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const degreeId = request.query.get('degreeId');
  context.log(`[${config.environment}] Http function processed request for url "${request.url}" usind degreeId: "${degreeId}"`);

  const startTime = Date.now();
  await mongoManager.openConnection();
  const connectionTime = Date.now();


  try {
    // let degree = await Degree.findOne({ degree_id: degreeId });
    let degree = await Degree.findById(degreeId);
    context.warn("id", degreeId, "degree", degree)
    
    //658c214bae8b9b57c19d0590

    context.log("degree", degree)

    if (degree === null) {
      return {
        status: 404,
        body: JSON.stringify({
          message: "Notfound",
          id: new mongoose.Types.ObjectId(degreeId),
          isValidId: isValidObjectId(degreeId)
        }),
      }
    }

    if (degree.units === null) {
      degree.units = await fetchUnits(degree.degree_id, degree._id)
    }

    const responseBody = {
      data: degree,
      meta: {
        responseTook: `${(Date.now() - startTime)}ms`,
        connectionTime: `${connectionTime - startTime}ms`,
      }
    }

    return {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(responseBody),
    };
  } catch (error) {
    context.error(error)
    await mongoManager.closeConnection();
    return {
      status: 500,
      body: "Internal Server Error",
    };
  }
};

app.http('getDegreeById', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: getDegreeById
});
