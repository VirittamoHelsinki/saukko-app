import { useEffect, useState } from 'react';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dayjs from "dayjs"
import { Icon } from '@iconify/react/dist/iconify.js';
import { fetchUserById } from "../../api/user";

import ClientEditModal from './ClientEditModal';

const formatDate = (date) => dayjs(date).format("DD.MM.YYYY")


const style = {
};


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
  const [ open, setOpen ] = useState(true);

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUserById(id),
  });

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

  const units = user?.evaluationId.units || [];


  return (
    <div className='clientPage__wrapper' id='main-wrapper'>
      <section className='clientPage__container'>

        <div className='title-container'>
          <p className="title">Asiakkuuden yhteenveto</p>
          <button className="title-container__edit-button">
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
            fieldLabel="Työpaikka"
            fieldValue={user?.workplaceId?.name}
          />
          <ClientInformationField
            fieldLabel="Y-tunnus"
            fieldValue={user?.workplaceId?.businessId}
          />
          <ClientInformationField
            fieldLabel="Työpaikan yksikkö"
            fieldValue={department?.name}
          />
          <ClientInformationField
            fieldLabel="Työpaikan yksikkön lisätiedot"
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
            disabled
          />

        </div>


        <div className='title-container'>
          <p className="title">Asiakkaan tutkinnon osat</p>
          <button className="title-container__edit-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M5.00699 16.9825L0.726521 16.9693L0.713867 12.4901L11.7856 0.904297L16.0787 5.39674L5.00699 16.9825ZM11.7856 3.50519L2.5215 13.1994L2.52782 15.0853L4.32913 15.091L13.5932 5.39674L11.7856 3.50519Z" fill="#0000BF"/>
            </svg>
          </button>
        </div>

        <div className="clientPage__card">
          {
            units.map((unit, index) => (
              <div key={"unit" + index} className="clientPage__unit">

                <p className="clientPage__unit-name">{unit.name.fi}</p>

                <div className="clientPage__unit-assessments">
                  {
                    unit.assessments.map((assessment, index) => (
                      <p key={"assessment" + index} className="clientPage__unit-assessment">{assessment.name.fi}</p>
                    ))
                  }
                </div>

              </div>
            ))
          }
        </div>

        <Link
          className="navigation-button"
          to="/client-list"
        >
          <Icon icon={"formkit:arrowleft"} />
          <p>Takaisin</p>
        </Link>

        <ClientEditModal isOpen={true} onClose={handleClose} />

      </section>
    </div>
  );

}

export default ClientPage;
