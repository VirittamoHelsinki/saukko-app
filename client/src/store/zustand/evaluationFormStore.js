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
    setOpenNotificationModalAllFields: (value) =>
      set({ openNotificationModalAllFields: value }),
    setOpenNotificationModalEmail: (value) =>
      set({ openNotificationModalEmail: value }),
    setOpenNotificationModalDate: (value) =>
      set({ openNotificationModalDate: value }),

    // Notification Modal close handlers
    handleCloseAllFields: () => set({ openNotificationModalAllFields: false }),
    handleCloseEmail: () => set({ openNotificationModalEmail: false }),
    handleCloseDate: () => set({ openNotificationModalDate: false }),

    // Setter functions for customer and evaluation
    setCustomer: (value) => set({ customer: value }),

    // Corrected setEvaluation to update with selectedTeacher
    setEvaluation: (value) =>
      set((state) => ({
        evaluation: {
          ...state.evaluation, // Maintain other fields in the evaluation
          ...value, // Update only the fields passed in 'value'
          teacher: state.selectedTeacher, // Add the selectedTeacher object from state
        },
      })),

    // State for the selected teacher
    selectedTeacher: null,
    setSelectedTeacher: (teacher) => set({ selectedTeacher: teacher }),

    // Function to reset form data
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
        selectedTeacher: null,
      });
    },
  };
});

export default useEvaluationFormStore;

