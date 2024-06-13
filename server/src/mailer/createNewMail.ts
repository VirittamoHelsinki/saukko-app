// import emailModel, { IEmailObj, IEmailObjDocument, emailObjSchema } from '../models/emailDocumentModel';
// import mongo from '../utils/mongo';
// import config from '../utils/config';

// const queueStorageConnectionString = config.QUEUE_STORAGE_CONNECTION_STRING;

// const createNewEmail = async (documentData: IEmailObj) => {
//   try {
//     if (!mongo.getConnection()) {
//       await mongo.openConnection();
//     }
//     const newDocument = await emailModel.create(documentData);
//     return newDocument;
//   } catch (error) {
//     console.error("Error adding document:", error);
//     throw error;
//   }
// }

// export default createNewEmail;

import emailModel, { IEmailObj, IEmailObjDocument, emailObjSchema } from '../models/emailDocumentModel';
import { QueueServiceClient, StorageSharedKeyCredential } from "@azure/storage-queue";
import config from "../utils/config";

const queueStorageConnectionString = config.QUEUE_STORAGE_CONNECTION_STRING;
const queueName = "mailer";

const createNewEmail = async (documentData: IEmailObj) => {

  if (!queueStorageConnectionString) throw new Error("The env QUEUE_STORAGE_CONNECTION_STRING is missing..")

  try {
    // Luodaan Queue Service -asiakas
    const queueServiceClient = QueueServiceClient.fromConnectionString(queueStorageConnectionString);

    // Luodaan jonopalvelun asiakas
    const queueClient = queueServiceClient.getQueueClient(queueName);

    // Lähetetään sähköpostin tiedot jonoon
    await queueClient.sendMessage(JSON.stringify(documentData));

    return "Sähköpostin tiedot lähetetty jonoon onnistuneesti.";
  } catch (error) {
    console.error("Virhe sähköpostin tietojen lähettämisessä jonoon:", error);
    throw error;
  }
};

export default createNewEmail;