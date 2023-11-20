import { create } from 'zustand';

// Create a custom hook called useStore using Zustand library
const useStore = create((set) => ({
  // Define initial state variables
  role: '',
  email: '',
  emailError: '',
  password: '',
  passwordVerify: '',
  passwordOld: '',
  address: '',
  postNumber: '',
  city: '',
  phone: '',
  birth: '',
  work: '',
  workDescription: '',
  contactPerson: '',
  workPhoneNumber: '',
  workAddress: '',
  goals: '',
  academy: '',
  education: '',
  openNotificationModal: false,


  // Workplace
  businessID: [],
  businessIDError: '',
  editedCompanyName: null,
  name: null,
  departments: [],
  supervisors: [],
  firstName: '',
  lastName: '',
  työpaikkaohjaajaEmail: '',

  // Degree
  degreeName: null,
  degreeDescription: null,
  diaryNumber: null,
  regulationDate: null,
  validFrom: null,
  expiry: null,
  transitionEnds: null,

  // Define setter functions to update state variables
  setRole: (role) => set({ role }),
  setEmail: (email) => set({ email }),
  setEmailError: (value) => set(() => ({ emailError: value })),
  setPassword: (password) => set({ password }),
  setPasswordVerify: (passwordVerify) => set({ passwordVerify }),
  setPasswordOld: (passwordOld) => set({ passwordOld }),
  setAddress: (address) => set({ address }),
  setPostNumber: (postNumber) => set({ postNumber }),
  setCity: (city) => set({ city }),
  setPhone: (phone) => set({ phone }),
  setBirth: (birth) => set({ birth }),
  setWork: (work) => set({ work }),
  setWorkDescription: (workDescription) => set({ workDescription }),
  setContactPerson: (contactPerson) => set({ contactPerson }),
  setWorkPhoneNumber: (workPhoneNumber) => set({ workPhoneNumber }),
  setWorkAddress: (workAddress) => set({ workAddress }),
  setGoals: (goals) => set({ goals }),
  setAcademy: (academy) => set({ academy }),
  setEducation: (education) => set({ education }),
  setOpenNotificationModal: (openNotificationModal) =>
    set({ openNotificationModal }),

  // Workplace flow
  setBusinessId: (value) => set(() => ({ businessId: value })),
  setBusinessIdError: (value) => set(() => ({ businessIDError: value })),
  setName: (value) => set(() => ({ name: value })),
  setDepartmentName: (value) => set(() => ({ departments: value })),
  setEditedCompanyName: (value) => set(() => ({ editedCompanyName: value })),
  setSupervisors: (value) => set(() => ({ supervisors: value })),

  setFirstName: (value) => set(() => ({ firstName: value })),
  setLastName: (value) => set(() => ({ lastName: value })),
  setTyöpaikkaohjaajaEmail: (value) => set(() => ({ työpaikkaohjaajaEmail: value })),

  // Degree setters
  setDegreeName: (degreeName) => set({ degreeName }),
  setDegreeDescription: (degreeDescription) => set({ degreeDescription }),
  setDiaryNumber: (diaryNumber) => set({ diaryNumber }),
  setRegulationDate: (regulationDate) => set({ regulationDate }),
  setValidFrom: (validFrom) => set({ validFrom }),
  setExpiry: (expiry) => set({ expiry }),
  setTransitionEnds: (transitionEnds) => set({ transitionEnds }),

  // Reset all state variables for degree's data
  resetDegreeData: () =>
    set({
      degreeName: null,
      degreeDescription: null,
      diaryNumber: null,
      regulationDate: null,
      validFrom: null,
      expiry: null,
      transitionEnds: null,
    }),

  resetWorkplaceData: () =>
    set({
      businessID: [],
      businessIDError: '',
      editedCompanyName: null,
      name: null,
      departments: [],
      supervisors: [],
      firstName: '',
      lastName: '',
      työpaikkaohjaajaEmail: '',
    }),

  // Define a resetForm function to reset all state variables to their initial values
  resetForm: () =>
    set({
      name: '',
      email: '',
      emailError: '',
      password: '',
      passwordVerify: '',
      address: '',
      postNumber: '',
      city: '',
      phone: '',
      birth: '',
      work: '',
      workDescription: '',
      contactPerson: '',
      workPhoneNumber: '',
      workAddress: '',
      goals: '',
      academy: '',
      education: '',
      businessId: '',
      businessIDError: '',
      firstName: '',
      lastName: '',
      työpaikkaohjaajaEmail: '',
    }),
}));

export default useStore;
