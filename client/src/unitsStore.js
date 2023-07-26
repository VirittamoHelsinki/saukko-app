/* 
  After saving chosen units to DB remember to clear store!

  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);

  const yourSubmitHandler {
    clearCheckedUnits();
  }
*/

import { create } from 'zustand';

const useUnitsStore = create((set) => ({
  checkedUnits: [],

  toggleUnit: (unit) => {
    set((state) => {
      const isChecked = state.checkedUnits.some((item) => item._id === unit._id);
      const updatedUnits = 
        // Uncheck unit
        isChecked ? state.checkedUnits.filter((item) => item._id !== unit._id)
        // Check unit
        : [...state.checkedUnits, unit]; 

      // Update state with new array of checked units
      return { checkedUnits: updatedUnits };
    });
  },

  clearCheckedUnits: () => {
    set({ checkedUnits: [] });
  },
}));

export default useUnitsStore;

