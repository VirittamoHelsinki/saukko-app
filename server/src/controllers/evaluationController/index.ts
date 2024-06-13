import create from "./create";
import deleteById from "./deleteById";
import getAll from "./getAll";
import getAllForCurrentUser from "./getAllForCurrentUser";
import getById from "./getById";
import handeUserPerformanceEmails from "./handeUserPerformanceEmails";
import sendEmailToTeacher from "./sendEmailToTeacher";
import update from "./update";

export default {
  create,
  getAll,
  getAllForCurrentUser,
  getById,
  update,
  deleteById,
  sendEmailToTeacher,
  handeUserPerformanceEmails,
};
