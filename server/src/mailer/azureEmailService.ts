import { EmailClient } from "@azure/communication-email";
import config from '../utils/config';

const client = new EmailClient(config.EMAIL_SERVICE_CONNECTION_STRING!);
const sender = "DoNotReply";

export type EmailObj = {
  content: {
    subject: string;
    plainText: string;
    html: string;
  },
  recipients: {
    to: { address: string }[]
  }
}

const sendEmail = async (messageParams: EmailObj) => {
  console.log('emailObj: ', messageParams)
  const poller = await client.beginSend({
    senderAddress: `${sender}@${config.EMAIL_FROM_SENDER_DOMAIN}`,
    ...messageParams
  });
  return await poller.pollUntilDone();
}

export default sendEmail;
