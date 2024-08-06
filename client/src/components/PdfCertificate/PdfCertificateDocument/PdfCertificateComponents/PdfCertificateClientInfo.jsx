import {
  View,
  StyleSheet,
  Text,
} from '@react-pdf/renderer';

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
      <Text style={styles.text}>[Asiakkaan etunimi] [Asiakkaan sukunimi]</Text>
      <Text style={styles.text}>[Tutkinto]</Text>
    </View>
  );
};

export default PdfCertificateClientInfo;
