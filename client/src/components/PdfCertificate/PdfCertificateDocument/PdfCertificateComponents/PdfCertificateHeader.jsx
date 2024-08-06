import {
  View,
  StyleSheet,
  Text,
  Font,
} from "@react-pdf/renderer";

const PdfCertificateHeader = () => {
  // Bubblegum fix for font weights, fix later?
  Font.register({
    family: 'Open Sans',
    fonts: [
      { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
      { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
    ]
  });

  const styles = StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: '30px',
    },
    block: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
    text: {
      fontFamily: 'Open Sans',
      fontSize: 9,
      color: "gray",
      textAlign: 'right',
      textAlign: 'center'
    },
    boldText: {
      fontFamily: 'Open Sans',
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
  );
}

export default PdfCertificateHeader;