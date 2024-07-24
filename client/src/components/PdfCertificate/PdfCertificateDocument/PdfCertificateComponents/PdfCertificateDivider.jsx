import { View, StyleSheet, Text } from '@react-pdf/renderer';

const PdfCertificateDivider = () => {
  const styles = StyleSheet.create({
    divider: {
      display: 'flex',
      justifyContent: 'center',
      width: '100vw',
      height: 1,
      borderTop: '1px solid black',
      marginTop: 10,
    },

    text: {
      position: 'absolute',
      left: 15,
      fontSize: 12,
      fontStyle: 'italic',
      marginTop: 15,
    },
  });

  return (
    <View style={styles.divider}>
      <Text style={styles.text}>
        Huom! Lomakkeelle tallentuu vain valmiiksi merkityt ammattitaitovaatimukset.
      </Text>
    </View>
  );
};

export default PdfCertificateDivider;
