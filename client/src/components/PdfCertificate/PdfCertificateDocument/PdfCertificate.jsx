import { Document, Page, View, StyleSheet, Text } from "@react-pdf/renderer";
import PdfCertificateHeader from "./PdfCertificateComponents/PdfCertificateHeader";
import PdfCertificateClientInfo from "./PdfCertificateComponents/PdfCertificateClientInfo";
import PdfCertificateWorkplaceInfo from "./PdfCertificateComponents/PdfCertificateWorkplaceInfo";
import PdfCertificateDegreeParts from "./PdfCertificateComponents/PdfCertificateDegreeParts";
import PdfCertificateDivider from "./PdfCertificateComponents/PdfCertificateDivider";

const PdfCertificate = () => {
    const styles = StyleSheet.create({
        page: {
            margin: '20px 40px',
        },
      });

    return (
      <Document style={styles.page}>
          <PdfCertificateHeader fixed />
          <PdfCertificateClientInfo />
          <PdfCertificateWorkplaceInfo />
          <PdfCertificateDegreeParts />
          <PdfCertificateDivider />
      </Document>
    );
};

export default PdfCertificate;
