


import SearchPage from "../SearchPage/SearchPage";
import DegreeInfo from "../DegreeInfo/DegreeInfo";
import DegreeUnits from "../DegreeUnits/DegreeUnits";
import EditUnits from "../EditUnits/EditUnits";
import SpecifyTasks from "../SpecifyTasks/SpecifyTasks";
import Summary from "../Summary/Summary";
import Stepper from "../../../components/Stepper/Stepper";
import { useParams } from "react-router-dom";




const AddDegreeFlowPage = () => {
  const { degreeId } = useParams();

  const stepperData = [
    {
      label: 'Tutkinto-tiedot',
      url: `/degrees/${degreeId}`
    },
    {
      label: degree.units ? 'Valitse tutkinnonosat' : 'Lisää tutkinnonosat',
      url: degree.units ? `/degrees/${degreeId}/units` : `/degrees/${degreeId}/edit-units`
    },
    {
      label: 'Määritä tehtävät',
      url: `/degrees/${degreeId}/units/tasks`
    },
    {
      label: 'Yhteenveto',
      url: `/degrees/${degreeId}/summary`
    },
  ]

  return (
    <div>
      <p>wtf</p>
    </div>
  );
}

export default AddDegreeFlowPage;