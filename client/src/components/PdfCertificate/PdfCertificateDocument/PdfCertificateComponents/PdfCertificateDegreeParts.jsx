import { View, StyleSheet } from '@react-pdf/renderer';
import CustomText from './CustomText';

const PdfCertificateDegreeParts = ({ unitNames }) => {
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
        <CustomText fontSize={12}>Tutkinnonosat ja ammattitaitovaatimukset:</CustomText>
      </View>
      <View style={styles.degreePartsDynamic}>
        {
          unitNames.map((unitName) =>
            <CustomText fontSize={12}>{unitName}</CustomText>
          )
        }
      </View>
    </View>
  );
};

export default PdfCertificateDegreeParts;
