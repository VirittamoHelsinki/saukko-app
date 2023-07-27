import { create } from 'zustand';

const useEvaluationStore = create((set) => ({
  customer: null,
  evaluation: null,
  supervisor: null,
  workplace: null,

  setCustomer: (customer) => set({ customer }),
  setEvaluation: (evaluation) => set({ evaluation }),
  setWorkplace: (workplace) => set({ workplace }),
  setSupervisor: (supervisor) => set({ supervisor }),
}));

export default useEvaluationStore;

/* 
  Access data in another component:

  import useEvaluationStore from '../../../evaluationStore';

  const customer = useEvaluationStore((state) => state.customer);
  const evaluation = useEvaluationStore((state) => state.evaluation);
*/