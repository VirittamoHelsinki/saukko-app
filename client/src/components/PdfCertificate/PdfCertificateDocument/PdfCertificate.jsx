import { Document, Page, View, StyleSheet, Text, Font } from "@react-pdf/renderer";
import PdfCertificateHeader from "./PdfCertificateComponents/PdfCertificateHeader";
import PdfCertificateClientInfo from "./PdfCertificateComponents/PdfCertificateClientInfo";
import PdfCertificateWorkplaceInfo from "./PdfCertificateComponents/PdfCertificateWorkplaceInfo";
import PdfCertificateDegreeParts from "./PdfCertificateComponents/PdfCertificateDegreeParts";
import PdfCertificateDivider from "./PdfCertificateComponents/PdfCertificateDivider";


const PdfCertificate = () => {

  // Bubblegum fix for font weights, fix later?
/*   Font.register({
    family: 'Roboto',
    fonts: [
      { src: 'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf' },
    ]
  });
 */

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
