import { useEffect } from 'react';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import { fetchUserById } from '../../api/user';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';


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
  

  const teacher = user?.evaluationId.teacherId
  const supervisor = user?.evaluationId.supervisorIds[0]


  return (
    <div className='clientPage__wrapper' id='main-wrapper'>
      <section className='clientPage__container'>

        <p className="title">Asiakkuuden yhteenveto</p>

        <div className="clientPage__client-information-container">
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
            fieldValue={user?.evaluationId.startDate}
          />
          <ClientInformationField
            fieldLabel="Asiakkuuden lopetuspäivä"
            fieldValue={user?.evaluationId.endDate}
          />
          <ClientInformationField
            fieldLabel="Työpaikka"
            fieldValue={user?.workplaceId.name}
          />
          <ClientInformationField
            fieldLabel="Y-tunnus"
            fieldValue={user?.workplaceId.businessId}
          />
          <ClientInformationField
            fieldLabel="Työpaikan yksikkö"
            fieldValue={"TODO: wip"}
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

      </section>
    </div>
  );

}

export default ClientPage;
