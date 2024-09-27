import { View, StyleSheet } from '@react-pdf/renderer';
import CustomText from './CustomText';

const PdfCertificateWorkplaceInfo = ({
  teacherName,
  supervisorName,
  workplaceName,
  contractDuration,
}) => {
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
        <CustomText style={styles.text} fontSize={12}>Ohjaaja:</CustomText>
        <CustomText style={styles.text} fontSize={12}>Työpaikka:</CustomText>
        <CustomText style={styles.text} fontSize={12}>Sopimusaika:</CustomText>
      </View>
      <View style={styles.workplaceInfoDynamic}>
        <CustomText style={styles.text} fontSize={12}>{teacherName}</CustomText>
        <CustomText style={styles.text} fontSize={12}>{supervisorName}</CustomText>
        <CustomText style={styles.text} fontSize={12}>{workplaceName}</CustomText>
        <CustomText style={styles.text} fontSize={12}>{contractDuration}</CustomText>
      </View>
    </View>
  );
};

export default PdfCertificateWorkplaceInfo;
