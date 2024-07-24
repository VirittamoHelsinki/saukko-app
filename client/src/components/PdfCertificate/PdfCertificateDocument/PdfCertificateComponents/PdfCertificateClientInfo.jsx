import {
  Document,
  Page,
  View,
  StyleSheet,
  Text,
  Font,
} from '@react-pdf/renderer';

const PdfCertificateClientInfo = () => {
  const styles = StyleSheet.create({
    customerInfo: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },
    block: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 10,
      marginTop: 25,
    },
    text: {
      fontSize: 16,
      marginBottom: 5,
      fontStyle: 'bold',
    },
  });
  return (
    <View style={styles.clientInfo}>
      <View style={styles.block}>
        <Text style={styles.text}>
          [Asiakkaan etunimi] [Asiakkaan sukunimi]
        </Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.text}>[Tutkinto]</Text>
      </View>
      <View style={styles.block}></View>
    </View>
  );
};

export default PdfCertificateClientInfo;
