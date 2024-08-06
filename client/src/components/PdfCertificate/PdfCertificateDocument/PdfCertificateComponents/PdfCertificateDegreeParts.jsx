import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer';

const PdfCertificateDegreeParts = () => {
  const styles = StyleSheet.create({
    degreePartsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      marginBottom: 10,
    },
    degreePartsDynamic: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      left: '35%',
      gap: 5,
    },
    text: {
      fontSize: 12,
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
        <Text style={styles.text}>[Tutkinnonosa 2]</Text>
        <Text style={styles.text}>[Tutkinnonosa 3]</Text>
        <Text style={styles.text}>[Tutkinnonosa 4]</Text>
      </View>
    </View>
  );
};

export default PdfCertificateDegreeParts;
