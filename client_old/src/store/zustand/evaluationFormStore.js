// Import create from zustand
import { create } from 'zustand';

const useEvaluationFormStore = create((set) => {
  return {
    // Evaluation form data
    firstName: '',
    lastName: '',
    email: '',
    startDate: '',
    endDate: '',
    workTasks: '',
    workGoals: '',

    // Notification Modals
    openNotificationModalAllFields: false,
    openNotificationModalEmail: false,
    openNotificationModalDate: false,

    // Setter functions for evaluation form data
    setFirstName: (value) => set({ firstName: value }),
    setLastName: (value) => set({ lastName: value }),
    setEmail: (value) => set({ email: value }),
    setStartDate: (value) => set({ startDate: value }),
    setEndDate: (value) => set({ endDate: value }),
    setWorkTasks: (value) => set({ workTasks: value }),
    setWorkGoals: (value) => set({ workGoals: value }),

    // Notification Modal setters
    setOpenNotificationModalAllFields: (value) => set({ openNotificationModalAllFields: value }),
    setOpenNotificationModalEmail: (value) => set({ openNotificationModalEmail: value }),
    setOpenNotificationModalDate: (value) => set({ openNotificationModalDate: value }),

    // Notification Modal close handlers
    handleCloseAllFields: () => set({ openNotificationModalAllFields: false }),
    handleCloseEmail: () => set({ openNotificationModalEmail: false }),
    handleCloseDate: () => set({ openNotificationModalDate: false }),

    // Setter functions for customer and evaluation
    setCustomer: (value) => set({ customer: value }),
    setEvaluation: (value) => set({ evaluation: value }),

    // Other functions related to the evaluation form can be added here
    // New function to reset form data
  resetFormData: () => {
    set({
      firstName: '',
      lastName: '',
      email: '',
      startDate: null,
      endDate: null,
      workTasks: '',
      workGoals: '',
      customer: null,
      evaluation: null,
    });
  },
  };
});

export default useEvaluationFormStore;