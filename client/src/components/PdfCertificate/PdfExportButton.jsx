import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import PdfCertificate from './PdfCertificateDocument/PdfCertificate';

const PdfExportButton = ({ data }) => {
  return (
    <PDFDownloadLink document={PdfCertificate({ data })} fileName='yhteenveto.pdf'>
      Lataa PDF-yhteenveto
    </PDFDownloadLink>
  );
};

export default PdfExportButton;
