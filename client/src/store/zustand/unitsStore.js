/* 
  USAGE

  const { checkedUnits, toggleUnit, clearCheckedUnits } = useUnitsStore();

  // Get checked units

    console.log(checkedUnits);

  // Check / uncheck units

    const handlerFunction = () => {
      toggleUnit(unit);
    };

  // Clear store

    const handlerFunction {
      clearCheckedUnits()
    };
*/

import { create } from 'zustand';

const useUnitsStore = create((set) => ({
  checkedUnits: [],

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

  addAssessment: (unitId, assessment) => {
    set((state) => {
      const updatedUnits = state.checkedUnits.map((unit) => {
        if (unit._id === unitId) {
          // Ensure that assessments is always an array and add the assessment
          const assessments = Array.isArray(unit.assessments) ? [...unit.assessments] : [];
          assessments.push({ name: { fi: assessment } });

          // Add the assessment to the unit
          return {
            ...unit,
            assessments,
          };
        }
        return unit;
      });
      return { checkedUnits: updatedUnits };
    });
  },

  clearCheckedUnits: () => {
    set({ checkedUnits: [] });
  },
}));

export default useUnitsStore;
