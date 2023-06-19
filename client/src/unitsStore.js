import { create } from 'zustand';

const useUnitsStore = create((set) => ({
  checkedUnits: [],

  toggleUnit: (unitId) => {
    set((state) => {
      const isChecked = state.checkedUnits.includes(unitId);
      const updatedUnits = isChecked
        ? state.checkedUnits.filter((id) => id !== unitId)
        : [...state.checkedUnits, unitId];

      return { checkedUnits: updatedUnits };
    });
  },
}));

export default useUnitsStore;

