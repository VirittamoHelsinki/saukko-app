import {
  View,
  StyleSheet,
  Text,
  Font,
} from "@react-pdf/renderer";

const PdfCertificateHeader = ({ degreeName }) => {
  const styles = StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 50,
    },
    block: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
    text: {
      fontSize: 9,
      color: "gray",
      textAlign: 'right',
      textAlign: 'center'
    },
    boldText: {
      fontSize: 9,
      color: "gray",
      textAlign: 'right',
      fontWeight: 600,
    }
  });

  return (
    <View style={styles.header} fixed>
      <View style={styles.block}>
        <Text style={styles.boldText}>Osaamistodistus</Text>
        <Text style={styles.text}>Tallennettu {new Date().toLocaleDateString()}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.text}>{degreeName}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.text}>Helsingin Kaupunki</Text>
        <Text style={styles.text}>OsTu-app</Text>
      </View>
    </View>
  );
}

export default PdfCertificateHeader;