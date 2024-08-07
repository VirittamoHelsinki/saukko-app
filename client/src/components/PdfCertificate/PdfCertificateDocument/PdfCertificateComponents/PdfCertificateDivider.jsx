import { View, StyleSheet } from '@react-pdf/renderer';
import CustomText from "./CustomText"

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
  });

  return (
    <View style={styles.dividerContainer}>
      <View style={styles.divider}></View>
      <CustomText fontSize={10}>
        Huom! Lomakkeelle tallentuu vain valmiiksi merkityt ammattitaitovaatimukset.
      </CustomText>
    </View>
  );
};

export default PdfCertificateDivider;
