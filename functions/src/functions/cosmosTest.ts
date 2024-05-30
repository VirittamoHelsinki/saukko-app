import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { CosmosClient } from "@azure/cosmos";
import config from "../utils/config";

const client = new CosmosClient(config.cosmosConnectionString);
const database = client.database('test');
const container = database.container('emaildocuments');

export async function cosmosTest(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    let success: boolean = false;
    try {
      const { resource: dbInfo } = await database.read();
      console.log(`Connected to database: ${dbInfo.id}`);
      success = true;
    } catch (error) {
      success = false;
      console.error('Failed to connect to Cosmos DB', error);
    }
    
    return { body: JSON.stringify({ success }) };
};

app.http('cosmosTest', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: cosmosTest
});
