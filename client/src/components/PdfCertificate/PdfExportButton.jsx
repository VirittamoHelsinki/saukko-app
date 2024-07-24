import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer';
import PdfCertificate from './PdfCertificateDocument/PdfCertificate';

const PdfExportButton = () => {
  return (
      <PDFDownloadLink document={<PdfCertificate />} fileName='somename.pdf'>
        Lataa PDF-yhteenveto
      </PDFDownloadLink>
  );
};

export default PdfExportButton;
