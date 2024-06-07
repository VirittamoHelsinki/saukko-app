import { app, InvocationContext } from "@azure/functions";
import { IEmailObj } from '../models/emailDocumentModel'
import { EmailClient } from "@azure/communication-email";
import config from "../utils/config";

const client = new EmailClient(config.emailServiceConnectionString!);
const sender = "DoNotReply";

const sendEmail = async (messageParams: IEmailObj) => {
  const poller = await client.beginSend({
    senderAddress: `${sender}@${config.emailFromSenderDomain}`,
    ...messageParams.msg
  });
  return await poller.pollUntilDone();
}

export async function SendEmailQueueProcessor(queueItem: unknown, context: InvocationContext): Promise<void> {
  context.log('Storage queue function processed work item:', queueItem);

  try {
    // TODO: fixaa tämä
    //
    // Tulkitaan jonosta saatu viesti

    const emailData: IEmailObj = queueItem as IEmailObj;
    /*  const emailData: IEmailObj = (JSON.parse(JSON.stringify(queueItem))); */

    // Lähetetään sähköposti
    const success = await sendEmail(emailData);

    // Jos lähetys onnistuu, logitaan viesti ja poistetaan jonosta
    if (success) {
      context.log("Sähköposti lähetetty onnistuneesti:", emailData);
    } else {
      context.log("Sähköpostin lähetys epäonnistui, lisätään viesti uudelleen jonoon.");
    }
  } catch (error) {
    context.error("Virhe käsittelyssä:", error);
    throw error;
  }
}

app.storageQueue('SendEmailQueueProcessor', {
  queueName: 'mailer',
  connection: 'QUEUE_STORAGE_CONNECTION_STRING',
  handler: SendEmailQueueProcessor
});
