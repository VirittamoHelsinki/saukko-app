import { useEffect, useState } from 'react';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dayjs from "dayjs"
import { Icon } from '@iconify/react/dist/iconify.js';
import { fetchUserById } from "../../api/user";
import PdfExportButton from '../../components/PdfCertificate/PdfExportButton.jsx';

import ClientEditModal from './ClientEditModal';
import { fetchEvaluationById } from '../../api/evaluation.js';

const formatDate = (date) => dayjs(date).format("DD.MM.YYYY")

const ClientInformationField = ({
  fieldLabel = "field",
  fieldValue = "-",
  disabled = false,
}) => {
  return (
    <div className={`client-information__field ${disabled ? "disabled" : ""}`}>
      <p className="field">{ fieldLabel }</p>
      <p className="value">{ fieldValue }</p>
    </div>
  )
}

function ClientPage() {
  const { id } = useParams()
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();
  const [ open, setOpen ] = useState(false);
  const [ evaluation, setEvaluation ] = useState(null);
  const [ user, setUser ] = useState(null);

  // fetchuserbyid in useeffect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchUserById(id);
        setUser(user);
      }
      catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    if (id) {
      fetchUser();
    }
  }, [id]);

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const evaluation = await fetchEvaluationById(user?.evaluationId?._id);
        setEvaluation(evaluation);
      } catch (error) {
        console.error('Error fetching evaluation:', error);
      }
    };

    if (user) {
      fetchEvaluation();
    }
  }, [ user ]);
  

  useEffect(() => {
    setSiteTitle("Asiakkuuden yhteenveto")
    setSubHeading("")
    setHeading("Asiakkuuden yhteenveto")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  const handleClose = () => {
    setOpen(false);
  };

  const teacher = user?.evaluationId.teacherId;
  const supervisor = user?.evaluationId?.supervisorIds?.[0];
  const department = user?.workplaceId?.departments?.[0];

  return (
    <div className='clientPage__wrapper' id='main-wrapper'>
      <section className='clientPage__container'>

        <h1>Asiakkuuden hallinnointi</h1>

        <div className='title-container'>
          <p className="title">Asiakkuuden yhteenveto</p>
          <button className="title-container__edit-button" onClick={() => setOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M5.00699 16.9825L0.726521 16.9693L0.713867 12.4901L11.7856 0.904297L16.0787 5.39674L5.00699 16.9825ZM11.7856 3.50519L2.5215 13.1994L2.52782 15.0853L4.32913 15.091L13.5932 5.39674L11.7856 3.50519Z" fill="#0000BF"/>
            </svg>
          </button>
        </div>

        <div className="clientPage__card">
          <ClientInformationField
            fieldLabel={"Nimi"}
            fieldValue={`${user?.firstName} ${user?.lastName}`}
          />
          <ClientInformationField
            fieldLabel="Sähköposti"
            fieldValue={user?.email}
          />
          <ClientInformationField
            fieldLabel="Asiakkuuden aloituspäivä"
            fieldValue={formatDate(user?.evaluationId?.startDate)}
          />
          <ClientInformationField
            fieldLabel="Asiakkuuden lopetuspäivä"
            fieldValue={formatDate(user?.evaluationId?.endDate)}
          />
          <ClientInformationField
            fieldLabel="Työpaikka ja yksikkö"
            fieldValue={`${evaluation?.workplaceId?.name}, ${department?.name || '-'}`}
          />
          <ClientInformationField
            fieldLabel="Y-tunnus"
            fieldValue={user?.workplaceId?.businessId}
          />
          <ClientInformationField
            fieldLabel="Työpaikan yksikön lisätiedot"
            fieldValue={department?.description}
          />
          <ClientInformationField
            fieldLabel="Ohjaaja"
            fieldValue={`${supervisor?.firstName} ${supervisor?.lastName}`}
          />
          <ClientInformationField
            fieldLabel="Opettaja"
            fieldValue={`${teacher?.firstName} ${teacher?.lastName}`}
          />
          <ClientInformationField
            fieldLabel="Täydennysjakson päättymispäivä *"
            fieldValue={evaluation?.extensionEndDate}
            disabled={!evaluation?.extensionEndDate}
          />
        </div>

        <div className='title-container'>
          <p className="title">Asiakkaan tutkinnon osat</p>
          <button className="title-container__edit-button" style={{ display: "none" }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M5.00699 16.9825L0.726521 16.9693L0.713867 12.4901L11.7856 0.904297L16.0787 5.39674L5.00699 16.9825ZM11.7856 3.50519L2.5215 13.1994L2.52782 15.0853L4.32913 15.091L13.5932 5.39674L11.7856 3.50519Z" fill="#0000BF"/>
            </svg>
          </button>
        </div>

        <div className="clientPage__card">
          <div className="clientPage__unit">

            <ClientInformationField
              fieldLabel={"Tutkinnon nimi"}
              fieldValue={evaluation?.degreeId?.name.fi}
            />

            <ClientInformationField
              fieldLabel={"Tutkinnon osat"}
              fieldValue={
                evaluation?.degreeId?.units?.reduce((acc, unit) => {
                  return acc + unit.name.fi + "\n";
                }, "").trim()
              }
            />

          </div>
        </div>

        <div className="footer-buttons">
          <Link
            className="navigation-button"
            to="/client-list"
          >
            <Icon icon={"formkit:arrowleft"} />
            <p>Takaisin</p>
          </Link>

          {
            user && evaluation && (
              <PdfExportButton data={evaluation} label="Vie PDF-muotoon"/>
            )
          }
        </div>


        {
          user && (
            <ClientEditModal
              isOpen={open}
              onClose={handleClose}
              userToEdit={user}
            />
          )
        }

      </section>
    </div>
  );

}

export default ClientPage;
