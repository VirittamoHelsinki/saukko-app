import { create } from 'zustand';

const useEvaluationStore = create((set) => ({
  customer: null,
  evaluation: null,
  setCustomer: (customer) => set({ customer }),
  setEvaluation: (evaluation) => set({ evaluation }),
}));

export default useEvaluationStore;

/* 
  Access customer & evaluation data in another component:

  import useEvaluationStore from '../../../evaluationStore';

  const customer = useEvaluationStore((state) => state.customer);
  const evaluation = useEvaluationStore((state) => state.evaluation);
*/