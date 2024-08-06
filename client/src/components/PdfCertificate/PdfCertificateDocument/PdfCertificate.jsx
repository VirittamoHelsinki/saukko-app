import { Document, Page, View, StyleSheet, Text } from "@react-pdf/renderer";
import PdfCertificateHeader from "./PdfCertificateComponents/PdfCertificateHeader";
import PdfCertificateClientInfo from "./PdfCertificateComponents/PdfCertificateClientInfo";
import PdfCertificateWorkplaceInfo from "./PdfCertificateComponents/PdfCertificateWorkplaceInfo";
import PdfCertificateDegreeParts from "./PdfCertificateComponents/PdfCertificateDegreeParts";
import PdfCertificateDivider from "./PdfCertificateComponents/PdfCertificateDivider";


const PdfCertificate = () => {
  const styles = StyleSheet.create({
    page: {
      padding: '30px 60px',
    },
  });

  return (
    <Document style={styles.page}>
      <Page style={styles.page}>
        <PdfCertificateHeader />
        <PdfCertificateClientInfo />
        <PdfCertificateWorkplaceInfo />
        <PdfCertificateDegreeParts />
        <PdfCertificateDivider />
      </Page>
    </Document>
  );
};

export default PdfCertificate;
