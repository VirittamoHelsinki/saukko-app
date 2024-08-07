import { Text, StyleSheet } from "@react-pdf/renderer";

const CustomText = ({ bold = false, fontSize = 10, children }) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: "Open Sans",
      fontWeight: bold ? 600 : 400,
      fontSize: fontSize,
    },
  });

  return <Text style={styles.text}>{children}</Text>
}

export default CustomText;