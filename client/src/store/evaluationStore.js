/* 
  USAGE

  Import:

    import useEvaluationStore from '../../../store/evaluationStore';

  Set data:

    const setCustomer = useEvaluationStore((state) => state.setCustomer);
    const setEvaluation = useEvaluationStore((state) => state.setEvaluation);
    const setWorkplace = useEvaluationStore((state) => state.setWorkplace);
    const setSupervisor = useEvaluationStore((state) => state.setSupervisor);

    setEvaluation(someData);

  Access data:

    const customer = useEvaluationStore((state) => state.customer);
    const evaluation = useEvaluationStore((state) => state.evaluation);
    const workplace = useEvaluationStore((state) => state.workplace);
    const supervisor = useEvaluationStore((state) => state.supervisor);
  
  Clear store:

    const clearEvaluation = useEvaluationStore((state) => state.clearEvaluation);

    const yourSubmitHandler {
      clearEvaluation();
    }
*/

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

  clearEvaluation: () => {
    set({ 
      customer: null, 
      evaluation: null,
      supervisor: null,
      workplace: null,
    });
  },
}));

export default useEvaluationStore;
