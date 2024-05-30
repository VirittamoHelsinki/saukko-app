import emailModel, { IEmailObj, IEmailObjDocument, emailObjSchema } from '../models/emailDocumentModel';
import mongo from '../utils/mongo';

const createNewEmail = async (documentData: IEmailObj) => {
  try {
    if (!mongo.getConnection()) {
      await mongo.openConnection();
    }
    const newDocument = await emailModel.create(documentData);
    return newDocument;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
}

export default createNewEmail;
