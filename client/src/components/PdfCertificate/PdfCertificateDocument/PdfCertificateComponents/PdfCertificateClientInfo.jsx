import {
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import CustomText from './CustomText';

const PdfCertificateClientInfo = () => {
  const styles = StyleSheet.create({
    clientInfo: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      marginBottom: 20,
    },
  });

  return (
    <View style={styles.clientInfo}>
      <CustomText bold fontSize={16}>[Asiakkaan etunimi] [Asiakkaan sukunimi]</CustomText>
      <CustomText bold fontSize={16}>[Tutkinto]</CustomText>
    </View>
  );
};

export default PdfCertificateClientInfo;
