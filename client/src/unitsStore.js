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

  clearCheckedUnits: () => {
    set({ checkedUnits: [] });
  },
}));

export default useUnitsStore;
