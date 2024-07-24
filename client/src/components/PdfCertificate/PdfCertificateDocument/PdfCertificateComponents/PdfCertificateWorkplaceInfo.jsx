import { Document, Page, View, StyleSheet, Text } from '@react-pdf/renderer';
import { useEffect } from 'react';
import useEvaluationStore from '../../../../store/zustand/evaluationStore'

const PdfCertificateWorkplaceInfo = () => {
  const styles = StyleSheet.create({
    workplaceInfoWrapper: {
      display: 'flex',
      flexDirection: 'row',
      width: '75%',
    },
    workplaceInfoStatic: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      fontStyle: 'bold',
    },
    workplaceInfoDynamic: {
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  return (
    <View style={styles.workplaceInfoWrapper}>
      <View  style={styles.workplaceInfoStatic}>
        <Text style={styles.text}>Opettaja:</Text>
        <Text style={styles.text}>Työpaikkaohjaaja:</Text>
        <Text style={styles.text}>Työpaikka:</Text>
        <Text style={styles.text}>Sopimusaika:</Text>
      </View>
      <View style={styles.workplaceInfoDynamic}>
        <Text style={styles.text}>[Opettajan nimi]</Text>
        <Text style={styles.text}>[Työpaikkaohjaajan nimi]</Text>
        <Text style={styles.text}>[Työpaikan nimi]</Text>
        <Text style={styles.text}>[Sopimusaika]</Text>
      </View>
    </View>
  );
};

export default PdfCertificateWorkplaceInfo;
