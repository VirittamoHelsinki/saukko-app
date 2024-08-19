import { create } from 'zustand';

const useEvaluationStore = create((set) => ({
  customer: null,
  evaluation: null,
  workplace: null,
  department: null,
  supervisor: null,

  setCustomer: (customer) => set({ customer }),
  setEvaluation: (evaluation) => set({ evaluation }),
  setWorkplace: (workplace) => set({ workplace }),
  setDepartment: (department) => set({ department }),
  setSupervisor: (supervisor) => set({ supervisor }),

  clearEvaluationFromStore: () => {
    set({
      customer: null,
      evaluation: null,
      workplace: null,
      department: null,
      supervisor: null,
    });
  },

  clearWorkplace: () => {
    set({
      workplace: null,
      department: null,
      supervisor: null,
    });
  },

  // Track chosen unit
  chosenUnitId: null,
  setChosenUnitId: (chosenUnitId) => set(() => ({ chosenUnitId })),
  clearChosenUnitId: () => set({ chosenUnitId: null }),
}));

export default useEvaluationStore;
