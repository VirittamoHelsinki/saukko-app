/* 
  USAGE

  const { checkedUnits, toggleUnit, clearCheckedUnits, setCheckedUnits } = useUnitsStore();

  // Get checked units

    console.log(checkedUnits);

  // Check / uncheck units

    const handlerFunction = () => {
      toggleUnit(unit);
    };

  // Replace the current array of units

    setCheckedUnits(newUnitsArray);

  // Clear store

    const handlerFunction {
      clearCheckedUnits()
    };
*/

import { create } from 'zustand';

const useUnitsStore = create((set) => ({
  units:[],
  assessments: [],
  criteria: [],
  checkedUnits: [],

  setCheckedUnits: (newUnits) => {
    set({ checkedUnits: newUnits });
  },

  setUnitAtIndex: (index, newValue) => {
    set((state) => {
      const newUnits = [...state.checkedUnits];
      newUnits[index] = newValue;
      return { checkedUnits: newUnits };
    });
  },

  toggleUnit: (unit) => {
    set((state) => {
      const isChecked = state.checkedUnits.some(
        (item) => item._id === unit._id
      );
      const updatedUnits =
        // Uncheck unit
        isChecked
          ? state.checkedUnits.filter((item) => item._id !== unit._id)
          : // Check unit
            [...state.checkedUnits, unit];

      // Update state with new array of checked units
      return { checkedUnits: updatedUnits };
    });
  },

  addAssessment: (unitId, assessment, criteria) => {
    set((state) => {
      const updatedUnits = state.checkedUnits.map((unit) => {
        if (unit._id === unitId) {
          // Ensure that assessments is always an array and add the assessment
          const assessments = Array.isArray(unit.assessments)
            ? [...unit.assessments]
            : [];
          const randomId = Math.floor(1000000 + Math.random() * 9000000);
          assessments.push({
            name: { fi: assessment },
            criteria: [{ fi: criteria, _id: randomId }],
            _id: randomId,
          });

          // Add the assessment to the unit
          return {
            ...unit,
            assessments,
          };
        }
        return unit;
      });
      const updatedUnitsData = { checkedUnits: updatedUnits };
      return updatedUnitsData;
    });
  },

  clearCheckedUnits: () => {
    set({ checkedUnits: [] });
  },
}));

export default useUnitsStore;
