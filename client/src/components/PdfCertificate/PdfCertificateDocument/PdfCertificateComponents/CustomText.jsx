import { Text, StyleSheet, Font } from "@react-pdf/renderer";

const CustomText = ({ bold = false, fontSize = 10, style = {}, children }) => {
  const styles = StyleSheet.create({
    text: {
      //fontFamily: "Open Sans",
      fontSize: fontSize,
      fontWeight: bold ? 600 : 400,
      ...style,
    },
  });

  return <Text style={styles.text}>{children}</Text>
}

export default CustomText;