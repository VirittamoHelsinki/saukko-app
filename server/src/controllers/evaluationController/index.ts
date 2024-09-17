import create from "./create";
import deleteById from "./deleteById";
import getAll from "./getAll";
import getAllForCurrentUser from "./getAllForCurrentUser";
import getById from "./getById";
import handleUserPerformanceEmails from "./handleUserPerformanceEmails";
import sendEmailToTeacher from "./sendEmailToTeacher";
import update from "./update";
import actualUpdate from "./actualUpdate";

export default {
  create,
  getAll,
  getAllForCurrentUser,
  getById,
  update,
  deleteById,
  sendEmailToTeacher,
  handleUserPerformanceEmails,
  actualUpdate,
};
