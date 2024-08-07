import { Document, Page, StyleSheet, Font } from "@react-pdf/renderer";
import PdfCertificateHeader from "./PdfCertificateComponents/PdfCertificateHeader";
import PdfCertificateClientInfo from "./PdfCertificateComponents/PdfCertificateClientInfo";
import PdfCertificateWorkplaceInfo from "./PdfCertificateComponents/PdfCertificateWorkplaceInfo";
import PdfCertificateDegreeParts from "./PdfCertificateComponents/PdfCertificateDegreeParts";
import PdfCertificateDivider from "./PdfCertificateComponents/PdfCertificateDivider";
import PdfCertificateUnit from "./PdfCertificateComponents/PdfCertificateUnit"



const PdfCertificate = ({ data }) => {
  console.log("CERTIFICATE", data); 

  const degree = data.degreeId
  const customer = data.customerId
  const teacher = data.teacherId
  const supervisor = data.supervisorIds[0]
  const workplace = data.workplaceId

  const degreeName = degree.name.fi
  const clientName = `${customer.firstName} ${customer.lastName}`
  const teacherName = `${teacher.firstName} ${teacher.lastName}`
  const supervisorName = `${supervisor.firstName} ${supervisor.lastName}`
  const workplaceName = workplace.name

  const startDate = new Date(data.startDate)
  const endDate = new Date(data.endDate)
  const contractDuration = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()} - ${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}` ;
  
  const unitNames = data.units.map((unit) => unit.name.fi) 

  // Font.register doesn't really register???
  Font.register({
    family: 'Open Sans',
    fonts: [
      {
        src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
        fontWeight: 400,
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf',
        fontWeight: 600,
      },
    ]
  });

  const styles = StyleSheet.create({
    page: {
      padding: '30px 60px',
    },
  });

  return (
    <Document style={styles.page}>
      <Page style={styles.page}>
        <PdfCertificateHeader degreeName={degreeName} />
        <PdfCertificateClientInfo
          clientName={clientName}
          degreeName={degreeName}
        />
        <PdfCertificateWorkplaceInfo
          teacherName={teacherName}
          supervisorName={supervisorName}
          workplaceName={workplaceName}
          contractDuration={contractDuration}
        />
        <PdfCertificateDegreeParts unitNames={unitNames}/>
        <PdfCertificateDivider />
        <PdfCertificateUnit units={data.units} />
      </Page>
    </Document>
  );
};

export default PdfCertificate;
