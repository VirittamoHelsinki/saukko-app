import { useEffect } from 'react';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import { fetchUserById } from '../../api/user';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import dayjs from "dayjs"
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import { Icon } from '@iconify/react/dist/iconify.js';


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
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  const { id } = useParams()

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

  console.log(user);
  

  const teacher = user?.evaluationId.teacherId;
  const supervisor = user?.evaluationId?.supervisorIds?.[0];
  const department = user?.workplaceId?.departments?.[0];

  const units = user?.evaluationId.units || [];


  return (
    <div className='clientPage__wrapper' id='main-wrapper'>
      <section className='clientPage__container'>

        <p className="title">Asiakkuuden yhteenveto</p>

        <div className="clientPage__card">
          {/* <p>{ JSON.stringify(user) }</p> */}

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


        <p className="title">Asiakkaan tutkinnon osat</p>
        <div className="clientPage__card">
          {
            units.map((unit) => (
              <div className="clientPage__unit">

                <p className="clientPage__unit-name">{unit.name.fi}</p>

                <div className="clientPage__unit-assessments">
                  {
                    unit.assessments.map((assessment) => (
                      <p className="clientPage__unit-assessment">{assessment.name.fi}</p>
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
      </section>
    </div>
  );

}

export default ClientPage;
