import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import Degree, { IDegree } from "../models/degreeModel";
import mongoManager from "../utils/mongo";
import sp from "../utils/searchParams";
import { fetchUnits } from "../utils/fetchUnits";

const pageSizeDefault = 10;

export async function getDegrees(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const startTime = Date.now();
  await mongoManager.openConnection();
  const connectionTime = Date.now();

  const pageSize = parseInt(request.query.get('pageSize') || pageSizeDefault.toString());
  const pageNumber = parseInt(request.query.get('pageNumber') || '1');
  const searchQuery = request.query.get('s') || '';

  context.log("searchQuery:", searchQuery)


  const startIndex = (pageNumber - 1) * pageSize;

  try {
    let projection = {};
    let queryFilter = {};

    const propParams = sp.getParamArr(request.url, "propName");
    if (propParams.length) {
      propParams.map(x => projection[x] = 1)
    }

    if (searchQuery && Degree.schema && Degree.schema.paths) {
      const namePaths = Object.keys(Degree.schema.paths).filter(path => path.startsWith("name."));
      const nameQueries = namePaths.map(lang => {
        const obj = {}
        obj[lang] = { $regex: searchQuery, $options: 'i' };
        return obj;
      })

      queryFilter['$or'] = nameQueries;
    }

    const totalResults = await Degree.countDocuments(queryFilter);
    let degrees = await Degree.find(queryFilter)
      .skip(startIndex)
      .limit(pageSize)
      .select(projection)
      .exec();

      context.log("totalResults:", totalResults)

    // parallel fetch units if they are missing
    const unitsPromises = degrees.map(async (degree) => {
      if (degree.units === null) {
        const units = await fetchUnits(degree.degree_id, degree._id);
        degree.units = units;
      }
      return degree;
    });

    degrees = await Promise.all(unitsPromises);

    const nextPage = sp.updateParams(request.url, "pageNumber", `${pageNumber + 1}`)
    const prevPage = sp.updateParams(request.url, "pageNumber", `${pageNumber - 1}`)

    const responseBody = {
      data: degrees,
      pagination: {
        totalResults: totalResults,
        pageSize: pageSize,
        pageNumber: pageNumber,
        totalPages: Math.ceil(totalResults / pageSize),
        nextPage: startIndex + pageSize < totalResults ? nextPage : null,
        prevPage: pageNumber > 1 ? prevPage : null
      },
      meta: {
        responseTook: `${(Date.now() - startTime)}ms`,
        connectionTime: `${connectionTime - startTime}ms`,
      }
    };

    return {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(responseBody)
    };
  } catch (error) {
    context.log(`Error fetching degrees: ${error}`);
    await mongoManager.closeConnection();
    return {
      status: 500,
      body: "Internal Server Error"
    };
  }
};

app.http('getDegrees', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: getDegrees
});
