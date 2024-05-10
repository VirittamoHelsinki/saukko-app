import { app, InvocationContext, Timer } from "@azure/functions";
import axios from "axios";
import Degree, { IDegree, IDegreeDocument } from "../models/degreeModel";
import mongo from "../utils/mongo";

const eperusteetApiUrl = "https://eperusteet.opintopolku.fi/eperusteet-service/api/external";
const perusteetEndpoint = "perusteet";

const koulutusTyypit = ["koulutustyyppi_1"];
const sivukoko = "5000";
const degreeMinYear = 2018;

export async function ePerusteetTimedQuery(myTimer: Timer, context: InvocationContext): Promise<void> {
  context.log('Timer function processed request.');

  const startTime = Date.now();
  mongo.openConnection();

  const params = new URLSearchParams();
  // only active degrees
  params.append("voimassa", "true");
  // "sivukoko" is set to 5000 to ensure that we got all the results
  params.append("sivukoko", sivukoko);
  // set the ePerusteet filter by "koulutustyyppi"
  koulutusTyypit && koulutusTyypit.forEach(type => params.append("koulutustyyppi", type));

  // build the URL
  const url = `${eperusteetApiUrl}/${perusteetEndpoint}?${params.toString()}`;

  // request data from ePerusteet API
  const response = (await axios.get(url)).data;
  const responseTime = Date.now();

  // TODO: declare the type
  const degreesList: IDegree[] = [];

  // TODO: declare the type
  // iterate throught the array
  response.data.forEach((degree: any) => {
    // get the year of establishment of the degree
    const diaryNumber = String(degree.diaarinumero);
    const diaryYear = parseInt(diaryNumber.substring(diaryNumber.length - 4));

    if (diaryYear > degreeMinYear && degree.koulutukset.length) {
      degreesList.push({
        degree_id: degree.id,
        diaryNumber: degree.diaarinumero,
        eduCodeValue: degree.koulutukset[0].koulutuskoodiArvo,
        examInfoURL: `https://eperusteet.opintopolku.fi/#/fi/ammatillinen/${degree.id}/tiedot`,
        expiry: degree.voimassaoloLoppuu,
        validFrom: degree.voimassaoloAlkaa,
        transitionEnds: degree.siirtymaPaattyy,
        regulationDate: degree.paatospvm,
        units: null,
        name: {
          fi: degree.nimi?.fi,
          sv: degree.nimi?.sv,
          en: degree.nimi?.en,
        },
        description: {
          fi: degree.kuvaus?.fi,
          sv: degree.kuvaus?.sv,
          en: degree.kuvaus?.en
        },
      });
    }
  });
  const dataGenerationTime = Date.now();

  // List of unsaved mongo documents
  for (const degree of degreesList) {
    const existingDoc = await Degree.findOne({ degree_id: degree.degree_id }); //await Degree.findById(degree.degree_id);
    if (!existingDoc) {
      await Degree.create(degree)
    }
  }
  mongo.closeConnection();
  const dataSavedTime = Date.now();
}

app.timer('ePerusteetTimedQuery', {
  schedule: '0 0 0 * * *',
  handler: ePerusteetTimedQuery
});
