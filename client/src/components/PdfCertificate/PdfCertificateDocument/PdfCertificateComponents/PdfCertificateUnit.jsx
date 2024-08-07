import {
  View,
  StyleSheet,
  Text,
  Font,
} from "@react-pdf/renderer";
import CustomText from "./CustomText";

const PdfCertificateUnit = ({ units }) => {
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
      border: "1px solid red",
    },

    container: {
      marginLeft: 40,
      marginTop: 20,

      display: 'flex',
      flexDirection: 'column',
      gap: 20,
    },

    textGroupContainer: {

      marginLeft: 40,
      marginBottom: 20,
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

  console.log(units);
  

  return (
    <View>

      {
        units.filter((unit) => unit.status === 3).map((unit) => {
          const unitName = unit.name.fi

          return (
            <>
              <CustomText fontSize={12} bold>Tutkinnonosa: {unitName}</CustomText>

              <View style={styles.container}>
                {
                  unit.assessments.map((assessment) => {
                    const assessmentName = assessment.name.fi
                    const criteria = assessment.criteria[0].fi
                    const comment = assessment.comment.text                  

                    return (
                      <>
                        <CustomText fontSize={12} bold>Ammattitaitovaatimus: {assessmentName}</CustomText>

                        <View style={styles.textGroupContainer}>
                          <View style={styles.textGroup}>
                            <Text style={styles.textBold}>Osaaminen:</Text>
                            <Text style={styles.text}>{criteria}</Text>
                          </View>

                          <View style={styles.textGroup}>
                            <Text style={styles.textBold}>Opettajan kommentti:</Text>
                            <Text style={styles.text}>{comment}</Text>
                          </View>
                        </View>
                      </>
                    )
                  })
                }
              </View>
            </>
          )
        })
      }



    </View>
  );
}

export default PdfCertificateUnit;