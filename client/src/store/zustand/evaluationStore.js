import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useEvaluationStore = create(
  persist(
    (set) => ({
      customer: null,
      evaluation: null,
      workplace: null,
      department: null,
      supervisor: null,

      // Methods to set individual states
      setCustomer: (customer) => set({ customer }),
      setEvaluation: (evaluation) => set({ evaluation }),
      setWorkplace: (workplace) => set({ workplace }),
      setDepartment: (department) => set({ department }),
      setSupervisor: (supervisor) => set({ supervisor }),

      // Clear all evaluation-related states
      clearEvaluationFromStore: () => {
        set({
          customer: null,
          evaluation: null,
          workplace: null,
          department: null,
          supervisor: null,
        });
      },

      // Clear only workplace-related data
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
    }),
    {
      name: 'evaluation-storage', // The key used for localStorage
      storage: createJSONStorage(() => localStorage), // Define storage to use localStorage
      partialize: (state) => ({
        evaluation: state.evaluation,
        customer: state.customer,
        workplace: state.workplace,
        department: state.department,
        supervisor: state.supervisor,
        chosenUnitId: state.chosenUnitId,
      }), // Specify which pieces of state to persist
    }
  )
);

export default useEvaluationStore;
