import { app, InvocationContext } from "@azure/functions";
import config from "../utils/config";

export async function SendEmailQueueProcessor(documents: unknown[], context: InvocationContext): Promise<void> {
    context.log(`Cosmos DB function processed ${documents.length} documents`);
}

app.cosmosDB('SendEmailQueueProcessor', {
    connectionStringSetting: "COSMOS_CONNECTION_STRING",
    databaseName: 'test',
    collectionName: 'emaildocuments',
    createLeaseCollectionIfNotExists: true,
    handler: SendEmailQueueProcessor,
});
