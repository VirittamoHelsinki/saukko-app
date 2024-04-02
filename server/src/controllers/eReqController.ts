import { Request, Response } from 'express';
import axios from 'axios';
import jp from 'jsonpath';

// TODO: move to env
const ePerusteAPI = 'https://eperusteet.opintopolku.fi/eperusteet-service/api/external';

// Function for fetching data from URL using axios
const _fetchDataAsync = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data; // axios automatically parses the JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}

const _responseWithError = (res: Response, statusCode: number, err: any, optionalMessage?: string) => {
  if (err.message) {
    console.log(err.message)
    res.status(statusCode).json({ errorMessage: err.message })
  } else {
    res.status(statusCode).json({ errorMessage: optionalMessage ?? "unknown error" })
  }
}

const getBusinessInfo = async (req: Request, res: Response) => {
  try {
    //Helsingin kaupuki is hard-coded, because it's not found in the API
    if (req.params.id == "0201256-6") {
      res.json({ BusinessId: "0201256-6", name: "Helsingin kaupunki" });
    } else {
      const businessData = await _fetchDataAsync(`http://avoindata.prh.fi/opendata/bis/v1/${req.params.id}`);
      res.json({ BusinessId: businessData.results[0].businessId, name: businessData.results[0].name });
    }
  } catch (error) {
    res.status(500).json({ error: "Business not found" });
  }
}

//Fetch all degrees from ePerusteet
const getAllDegrees = async (req: Request, res: Response) => { // TODO: FIX TYPES
  try {
    const degreeList: any[] = [];
    const degrees = await _fetchDataAsync(`${ePerusteAPI}/perusteet?sivukoko=100000&voimassa=true`);

    degrees.data.forEach((degree: any) => {
      const diaryNumber = String(degree.diaarinumero);
      const diaryYear = parseInt(diaryNumber.substring(diaryNumber.length - 4));
      if (diaryYear > 2018 && degree.koulutukset[0]) {
        degreeList.push({ _id: degree.id, diaryNumber: degree.diaarinumero, eduCodeValue: degree.koulutukset[0].koulutuskoodiArvo, name: { fi: degree.nimi.fi, sv: degree.nimi.sv, en: degree.nimi.en } });
      }
    });

    res.json(degreeList);

  } catch (error) {
    return _responseWithError(res, 500, error)
    // res.status(500).json({ error: error.message });
  }
}

//Fetch degree information from ePerusteet
const getDegreeById = async (req: Request, res: Response) => {
  try {
    const degreeId = req.params.id;
    console.log(`Fetching data for degree with ID: ${degreeId}`);

    const degreeData = await _fetchDataAsync(`${ePerusteAPI}/peruste/${degreeId}`);
    if (!degreeData) throw new Error('Degree data not found');

    const degreeUnits = await _fetchDataAsync(`${ePerusteAPI}/peruste/${degreeId}/tutkinnonOsat`);
    if (!degreeUnits) throw new Error('Degree units not found');

    let unitList: any[] = [];

    degreeUnits.forEach((unit: any) => {
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
    return _responseWithError(res, 500, error, 'Internal Server Error')
    // console.error('Error fetching degree info:', error); // Log the error to the console
    // res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default {
  getBusinessInfo,
  getAllDegrees,
  getDegreeById,
}
