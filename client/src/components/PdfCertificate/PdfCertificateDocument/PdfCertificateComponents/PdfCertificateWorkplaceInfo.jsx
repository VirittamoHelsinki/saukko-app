import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import { useEffect } from 'react';
import useEvaluationStore from '../../../../store/zustand/evaluationStore'
import CustomText from './CustomText';

const PdfCertificateWorkplaceInfo = () => {
  const styles = StyleSheet.create({
    workplaceInfoWrapper: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      marginBottom: 15,
    },
    workplaceInfoStatic: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      width: '35%',
      fontStyle: 'bold',
    },
    workplaceInfoDynamic: {
      display: 'flex',
      flexDirection: 'column',
      gap: 5,
      width: '50%',
    },
    text: {
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.workplaceInfoWrapper}>
      <View  style={styles.workplaceInfoStatic}>
        <CustomText style={styles.text} fontSize={12}>Opettaja:</CustomText>
        <CustomText style={styles.text} fontSize={12}>Työpaikkaohjaaja:</CustomText>
        <CustomText style={styles.text} fontSize={12}>Työpaikka:</CustomText>
        <CustomText style={styles.text} fontSize={12}>Sopimusaika:</CustomText>
      </View>
      <View style={styles.workplaceInfoDynamic}>
        <CustomText style={styles.text} fontSize={12}>[Opettajan nimi]</CustomText>
        <CustomText style={styles.text} fontSize={12}>[Työpaikkaohjaajan nimi]</CustomText>
        <CustomText style={styles.text} fontSize={12}>[Työpaikan nimi]</CustomText>
        <CustomText style={styles.text} fontSize={12}>[Sopimusaika]</CustomText>
      </View>
    </View>
  );
};

export default PdfCertificateWorkplaceInfo;
