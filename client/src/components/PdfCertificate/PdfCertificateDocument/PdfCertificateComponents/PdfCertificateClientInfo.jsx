import {
  View,
  StyleSheet,
  Text,
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
    text: {
      fontSize: 16,
      marginBottom: 5,
      fontStyle: 'bold',
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
