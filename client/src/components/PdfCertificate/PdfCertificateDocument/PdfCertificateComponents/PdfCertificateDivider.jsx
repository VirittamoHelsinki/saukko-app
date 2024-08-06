import { View, StyleSheet, Text } from '@react-pdf/renderer';

const PdfCertificateDivider = () => {
  const styles = StyleSheet.create({
    dividerContainer: {
      marginBottom: 20,
    },
    divider: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: 1,
      borderTop: '1px solid black',
      marginTop: 20,
      marginBottom: 10,
    },

    text: {
      fontSize: 10,
    },
  });

  return (
    <View style={styles.dividerContainer}>
      <View style={styles.divider}></View>
      <Text style={styles.text}>
        Huom! Lomakkeelle tallentuu vain valmiiksi merkityt ammattitaitovaatimukset.
      </Text>
    </View>
  );
};

export default PdfCertificateDivider;
