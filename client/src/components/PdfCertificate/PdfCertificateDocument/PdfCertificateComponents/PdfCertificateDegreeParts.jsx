import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer';

const PdfCertificateDegreeParts = () => {
  const styles = StyleSheet.create({
    degreePartsWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    degreePartsStatic: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
    },
    degreePartsDynamic: {
      display: 'flex',
      alignItems: 'flex-end',
      flexDirection: 'column',
      width: '50%',
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.degreePartsWrapper}>
      <View style={styles.degreePartsStatic}>
        <Text style={styles.text}>
          Tutkinnonosat ja ammattitaitovaatimukset:
        </Text>
      </View>
      <View style={styles.degreePartsDynamic}>
        <Text style={styles.text}>[Tutkinnonosa 1]</Text>
      </View>
    </View>
  );
};

export default PdfCertificateDegreeParts;
