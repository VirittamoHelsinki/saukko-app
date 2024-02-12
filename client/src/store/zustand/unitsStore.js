
import { create } from 'zustand';

const useUnitsStore = create((set) => ({
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

  addAssessment: (unitId, assessment) => {
    set((state) => {
      const updatedUnits = state.checkedUnits.map((unit) => {
        if (unit._id === unitId) {
          // Ensure that assessments is always an array and add the assessment
          const assessments = Array.isArray(unit.assessments) ? [...unit.assessments] : [];
          const randomId = Math.floor(1000000 + Math.random() * 9000000);
          assessments.push({ name: { fi: assessment }, _id: randomId });

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
