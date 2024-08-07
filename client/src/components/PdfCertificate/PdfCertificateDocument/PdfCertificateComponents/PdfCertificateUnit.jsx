import {
  View,
  StyleSheet,
  Text,
  Font,
} from "@react-pdf/renderer";
import CustomText from "./CustomText";

const PdfCertificateUnit = () => {
  const styles = StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 0,
    },

    unitHeader: {
      fontSize: 12,
      fontWeight: 600,
    },

    container: {
      marginLeft: 40,
      marginTop: 20,

      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    },

    textGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    },

    text: {
      fontSize: 10,
    },

    textBold: {
      fontSize: 10,
      fontWeight: 'bold',
    }
  });

  return (
    <View>
      <CustomText fontSize={12} bold>Tutkinnonosa: [Tutkinnonosa 1]</CustomText>

      <View style={styles.container}>
        <CustomText fontSize={12} bold>Ammattitaitovaatimus: [Ammattitaitovaatimus 1.1]</CustomText>

        <View style={styles.container}>
          <View style={styles.textGroup}>
            <Text style={styles.textBold}>Osaaminen:</Text>
            <Text style={styles.text}>[Osaa ohjatusti/Osaa itsenäisesti]</Text>
          </View>

          <View style={styles.textGroup}>
            <Text style={styles.textBold}>Opettajan kommentti:</Text>
            <Text style={styles.text}>[Opettajan muistiinpano]</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <CustomText fontSize={12} bold>Ammattitaitovaatimus: [Ammattitaitovaatimus 1.2]</CustomText>

        <View style={styles.container}>
          <View style={styles.textGroup}>
            <CustomText fontSize={10} bold>Osaaminen:</CustomText>
            <CustomText fontSize={10}>[Osaa ohjatusti/Osaa itsenäisesti]</CustomText>
          </View>

          <View style={styles.textGroup}>
            <CustomText fontSize={10} bold>Opettajan kommentti:</CustomText>
            <CustomText fontSize={10}>[Opeetajan muistiinpano]</CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PdfCertificateUnit;