import {
  View,
  StyleSheet,
  Text,
  Font,
} from "@react-pdf/renderer";

const PdfCertificateUnit = () => {
  const styles = StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 50,
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
      <Text style={styles.unitHeader}>Tutkinnonosa: [Tutkinnonosa 1]</Text>

      <View style={styles.container}>
        <Text style={styles.unitHeader}>Ammattitaitovaatimus: [Ammattitaitovaatimus 1.1]</Text>

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
        <Text style={styles.unitHeader}>Ammattitaitovaatimus: [Ammattitaitovaatimus 1.2]</Text>

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
    </View>
  );
}

export default PdfCertificateUnit;