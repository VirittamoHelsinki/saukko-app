import { create } from 'zustand';

const useUnitsStore = create((set) => ({
  checkedUnits: [],

  toggleUnit: (unitId) => {
    set((state) => {
      const isChecked = state.checkedUnits.includes(unitId);
      const updatedUnits = 
        // Uncheck unit
        isChecked ? state.checkedUnits.filter((id) => id !== unitId)
        // Check unit
        : [...state.checkedUnits, unitId]; 

      // Update state with new array of checked units
      return { checkedUnits: updatedUnits };
    });
  },
}));

export default useUnitsStore;

