
const router = require("express").Router();
const jp = require('jsonpath')

//ePerusteet API URL
const ePerusteAPI = 'https://eperusteet.opintopolku.fi/eperusteet-service/api/external';

//Function for fetching data from URL
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
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
    const degreeData = await fetchData(`${ePerusteAPI}/peruste/${req.params.id}`);
    const degreeUnits = await fetchData(`${ePerusteAPI}/peruste/${req.params.id}/tutkinnonOsat`);
    let unitList = [];
    let modulex;

    degreeUnits.forEach(unit => {
      let modules = jp.query(unit, '$..arviointi.arvioinninKohdealueet[*]');
      modulex = modules;

      let assessmentList = [];

      /*modules.forEach(module => {
        let criteria = module.arvioinninKohteet[0].osaamistasonKriteerit[0].kriteerit;
        let criteriaList = [];

        criteria.forEach(criterion => {
          criteriaList.push({_id: criterion._id, fi: criterion.fi, sv: criterion.sv, en: criterion.en});
        });
        

      assessmentList.push({_id: module.koodi.id, name: {fi: module.otsikko.fi, sv: module.otsikko.sv, en: module.otsikko.en}, criteria: criteriaList});
      });*/

      unitList.push({ _id: unit.id, name: { fi: unit.nimi.fi, sv: unit.nimi.sv, en: unit.nimi.en }/*, assessments: assessmentList*/ });

    });

    const degree = {
      _id: req.params.id,
      name: { fi: degreeData.nimi.fi, sv: degreeData.nimi.sv, en: degreeData.nimi.en },
      eduCodeValue: degreeData.koulutukset[0].koulutuskoodiArvo,
      diaryNumber: degreeData.diaarinumero,
      regulationDate: degreeData.paatospvm,
      transitionEnds: degreeData.siirtymaPaattyy,
      validFrom: degreeData.voimassaoloAlkaa,
      expiry: degreeData.voimassaoloLoppuu,
      examInfoURL: `https://eperusteet.opintopolku.fi/#/fi/ammatillinen/${req.params.id}/tiedot`,
      description: { fi: degreeData.kuvaus.fi, sv: degreeData.kuvaus.sv, en: degreeData.kuvaus.en },
      units: unitList,
    };

    res.json(degree);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router
