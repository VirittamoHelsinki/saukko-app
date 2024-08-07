import { Document, Page, View, StyleSheet, Text, Font } from "@react-pdf/renderer";
import PdfCertificateHeader from "./PdfCertificateComponents/PdfCertificateHeader";
import PdfCertificateClientInfo from "./PdfCertificateComponents/PdfCertificateClientInfo";
import PdfCertificateWorkplaceInfo from "./PdfCertificateComponents/PdfCertificateWorkplaceInfo";
import PdfCertificateDegreeParts from "./PdfCertificateComponents/PdfCertificateDegreeParts";
import PdfCertificateDivider from "./PdfCertificateComponents/PdfCertificateDivider";
import PdfCertificateUnit from "./PdfCertificateComponents/PdfCertificateUnit"


const PdfCertificate = () => {

  // Bubblegum fix for font weights, fix later?
  Font.register({
    family: 'Open Sans',
    fonts: [
      {
        src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf',
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf',
        fontWeight: 600
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
        <PdfCertificateHeader />
        <PdfCertificateClientInfo />
        <PdfCertificateWorkplaceInfo />
        <PdfCertificateDegreeParts />
        <PdfCertificateDivider />
        <PdfCertificateUnit />
      </Page>
    </Document>
  );
};

export default PdfCertificate;
