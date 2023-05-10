// importing components
import UserNav from "../../components/UserNav/UserNav";
import WavesHeader from "../../components/Header/WavesHeader";
import Accomplishments from "./Accomplishments/Accomplishments";
import Teachers from "./Teachers/Teachers";
import Degrees from "./Degrees/Degrees";

const UserPage = () => {
  const tempData = {
    accomplishments: {
      tasksDone: 5,
      combinedTasks: 28,
    },

    teachers: [
      {
        id: 0,
        name: "Jonna Virtanen",
        position: "Tieto- ja viestintätekniikan opettaja",
      },
      {
        id: 1,
        name: "Sami Virtanen",
        position: "Tieto- ja viestintätekniikan opettaja",
      },
    ],

    degrees: [
      {
        id: 0,
        name: "Tieto- ja viestintätekniikan perustutkinto",
        points: 180,
      },
      {
        id: 0,
        name: "Tieto- ja viestintätekniikan perustutkinto",
        points: 180,
      },
    ],
  };

  return (
    <main className="userPage__wrapper">
      <WavesHeader title="Tervetuloa, Nimi" fill="#9fc9eb" disabled="true" />
      <UserNav />
      <section className="userPage__container">
        <Accomplishments data={tempData.accomplishments} />
        <Teachers data={tempData.teachers} />
        <Degrees data={tempData.degrees} />
      </section>
    </main>
  );
};

export default UserPage;
