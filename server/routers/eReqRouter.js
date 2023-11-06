const router = require("express").Router();
const jp = require('jsonpath');
const axios = require('axios');
 
// ePerusteet API URL
const ePerusteAPI = 'https://eperusteet.opintopolku.fi/eperusteet-service/api/external';

// Function for fetching data from URL using axios
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    return response.data; // axios automatically parses the JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}
 
router.get(['/business/:id', '/external/business/:id'], async (req, res) => {
  try {
    //Helsingin kaupuki is hard-coded, because it's not found in the API
    if (req.params.id == "0201256-6") {
      res.json({ BusinessId: "0201256-6", name: "Helsingin kaupunki" });
    } else {
      const businessData = await fetchData(`http://avoindata.prh.fi/opendata/bis/v1/${req.params.id}`);
      res.json({ BusinessId: businessData.results[0].businessId, name: businessData.results[0].name });
    }
  } catch (error) {
    res.status(500).json({ error: "Business not found" });
  }
});
 
//Fetch all degrees from ePerusteet
router.get(['/degrees', '/external/degrees'], async (req, res) => {
  try {
    const degreeList = [];
    const degrees = await fetchData(`${ePerusteAPI}/perusteet?sivukoko=100000&voimassa=true`);
 
    degrees.data.forEach(degree => {
      diaryNumber = String(degree.diaarinumero);
      diaryYear = parseInt(diaryNumber.substring(diaryNumber.length - 4));
      if (diaryYear > 2018 && degree.koulutukset[0]) {
        degreeList.push({ _id: degree.id, diaryNumber: degree.diaarinumero, eduCodeValue: degree.koulutukset[0].koulutuskoodiArvo, name: { fi: degree.nimi.fi, sv: degree.nimi.sv, en: degree.nimi.en } });
      }
    });
 
    res.json(degreeList);
 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
 
 
//Fetch degree information from ePerusteet
router.get(['/degree/:id', '/external/degree/:id'], async (req, res) => {
  try {
    const degreeId = req.params.id;
    console.log(`Fetching data for degree with ID: ${degreeId}`);
   
    const degreeData = await fetchData(`${ePerusteAPI}/peruste/${degreeId}`);
    if (!degreeData) throw new Error('Degree data not found');
   
    const degreeUnits = await fetchData(`${ePerusteAPI}/peruste/${degreeId}/tutkinnonOsat`);
    if (!degreeUnits) throw new Error('Degree units not found');
   
    let unitList = [];
 
    degreeUnits.forEach(unit => {
      let modules = jp.query(unit, '$..arviointi.arvioinninKohdealueet[*]');
      // Log module info to the console for debugging
      console.log(`Modules for unit ${unit.id}:`, modules);
 
      unitList.push({ _id: unit.id, name: { fi: unit.nimi.fi, sv: unit.nimi.sv, en: unit.nimi.en } });
    });
 
  const degree = {
  _id: degreeId,
  name: {
    fi: degreeData.nimi?.fi || 'N/A',
    sv: degreeData.nimi?.sv || 'N/A',
    en: degreeData.nimi?.en || 'N/A'
  },
  units: unitList,
  eduCodeValue: degreeData.koulutukset?.[0]?.koulutuskoodiArvo || 'N/A',
  diaryNumber: degreeData.diaarinumero || 'N/A',
  regulationDate: degreeData.paatospvm || 'N/A',
  transitionEnds: degreeData.siirtymaPaattyy || 'N/A',
  validFrom: degreeData.voimassaoloAlkaa || 'N/A',
  expiry: degreeData.voimassaoloLoppuu || 'N/A',
  examInfoURL: `https://eperusteet.opintopolku.fi/#/fi/ammatillinen/${degreeId}/tiedot`,
  description: {
    fi: degreeData.kuvaus?.fi || 'N/A',
    sv: degreeData.kuvaus?.sv || 'N/A',
    en: degreeData.kuvaus?.en || 'N/A'
  },
};
 
    console.log('Degree info:', degree);
    res.status(200).json(degree);
 
  } catch (error) {
    console.error('Error fetching degree info:', error); // Log the error to the console
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 
 
module.exports = router