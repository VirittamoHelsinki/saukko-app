/* 
  USAGE

  Import:

    import useEvaluationStore from '../../../store/evaluationStore';

  Set data:

    const { setCustomer, setEvaluation, setWorkplace, setSupervisor } = useEvaluationStore();
    setEvaluation(someData);

  Access data:

    const { customer, evaluation, workplace, supervisor } = useEvaluationStore();
  
  Clear store:

    const { clearEvaluation, clearWorkplace } = useEvaluationStore();

    const handlerFunction {
      clearEvaluation();
    }
*/

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

  clearEvaluation: () => {
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
}));

export default useEvaluationStore;
