import { Response } from 'express';
import { Request } from '../../types/requestType';
import UserModel, { User } from '../../models/userModel';

const sendEmailToTeacher = async (req: Request, res: Response) => {
  try {
    if (!req.body.teacherId || !req.body.message) {
      return res
        .status(400)
        .send('Missing teacherId or message in the request body.');
    }

    const teacher = await UserModel.findById(req.body.teacherId);

    if (!teacher) {
      return res.status(404).send('Teacher not found.');
    }

    //TODO: Implement correct function
    // sendUserMail(teacher, req.body.message);


    res.status(200).send('Email sent successfully.');
  } catch (error) {
    console.error('Error in sending email: ', error);
    res.status(500).send('Internal Server Error');
  }
};

export default sendEmailToTeacher;
