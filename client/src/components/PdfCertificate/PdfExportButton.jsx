import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfCertificate from './PdfCertificateDocument/PdfCertificate';
import { Icon } from '@iconify/react/dist/iconify.js';

const PdfExportButton = ({ data }) => {
  return (
    <PDFDownloadLink
      className="button--pdf"

      document={PdfCertificate({ data })}
      fileName='yhteenveto.pdf'
    >
      <span>Tee PDF-yhteenveto osaamisesta</span>
      <Icon fontSize={20} icon="bx:file" />
    </PDFDownloadLink>
  );
};

export default PdfExportButton;
