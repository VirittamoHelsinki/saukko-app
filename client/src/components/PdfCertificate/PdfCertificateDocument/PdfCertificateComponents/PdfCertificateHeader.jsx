import { Document, Page, View, StyleSheet, Text } from "@react-pdf/renderer";

const PdfCertificateHeader = () => {
  const styles = StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
    block: {
      display: "flex",
      flexDirection: "column",
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
      color: "gray",
    }
  })

  return (
    <View style={styles.header} fixed>
      <View style={styles.block}>
        <Text style={styles.text}>Osaamistodistus</Text>
        <Text style={styles.text}>Tallenettu {new Date().toLocaleDateString()}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.text}>[Tutkinnon nimi]</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.text}>Helsingin Kaupunki</Text>
        <Text style={styles.text}>OsTu-app</Text>
      </View>
    </View>
  )
}

export default PdfCertificateHeader;