import emailModel, { IEmailObj, IEmailObjDocument, emailObjSchema } from '../models/emailDocumentModel';
import { QueueServiceClient, StorageSharedKeyCredential } from "@azure/storage-queue";
import config from "../utils/config";

const queueStorageConnectionString = config.QUEUE_STORAGE_CONNECTION_STRING;
const queueName = "mailer";

const sendingMailToQueue = async (mail: IEmailObj) => {
  if (!queueStorageConnectionString) {
    throw new Error("The env QUEUE_STORAGE_CONNECTION_STRING is missing.");
  }

  try {
    const queueServiceClient = QueueServiceClient.fromConnectionString(queueStorageConnectionString);
    const queueClient = queueServiceClient.getQueueClient(queueName);

    // Ensure the queue exists
    await queueClient.createIfNotExists();

    // Serialize the mail object to a JSON string
    const messageContent = JSON.stringify(mail);

    // Send the message to the queue
    await queueClient.sendMessage(Buffer.from(messageContent).toString("base64"));

    console.log("Mail data sent to the queue successfully.");
  } catch (error) {
    console.error("Error sending mail data to the queue:", error);
    throw error;
  }
};

// const createNewEmail = async (documentData: IEmailObj) => {
//
//   if (!queueStorageConnectionString) throw new Error("The env QUEUE_STORAGE_CONNECTION_STRING is missing..")
//
//   try {
//     // Luodaan Queue Service -asiakas
//     const queueServiceClient = QueueServiceClient.fromConnectionString(queueStorageConnectionString);
//
//     // Luodaan jonopalvelun asiakas
//     const queueClient = queueServiceClient.getQueueClient(queueName);
//
//     // Lähetetään sähköpostin tiedot jonoon
//     await queueClient.sendMessage(JSON.stringify(documentData));
//
//     console.log("Sähköpostin tiedot lähetetty jonoon onnistuneesti.");
//     return "Sähköpostin tiedot lähetetty jonoon onnistuneesti.";
//   } catch (error) {
//     console.error("Virhe sähköpostin tietojen lähettämisessä jonoon:", error);
//     throw error;
//   }
// };

/* export { testingQueue }; */
export default sendingMailToQueue;
