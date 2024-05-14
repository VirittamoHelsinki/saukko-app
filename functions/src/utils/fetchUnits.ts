import Degree, { IDegree } from "../models/degreeModel";
import axios from "axios";

export async function fetchUnits(degreeId: number, entityId: string) {
  try {
    const response = await axios.get(`https://eperusteet.opintopolku.fi/eperusteet-service/api/external/peruste/${degreeId}`);
    if (response.status === 200 && response.data && response.data.tutkinnonOsat) {
      const unitsData = response.data.tutkinnonOsat as any[];

      const units = unitsData.map(unit => ({
        _id: unit.id,
        name: {
          fi: unit.nimi.fi,
          sv: unit.nimi.sv,
          en: unit.nimi.en,
        }
      }));

      await Degree.findByIdAndUpdate(entityId, {
        units: units,
      });

      return units;
    }
  } catch (error) {
    console.error("error fetching units")
  }

  return [];
}
