import { create } from 'zustand';

const useStore = create((set) => {
  return {
    // User data
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

    // Workplace data
    businessID: [],
    businessIDError: '',
    editedCompanyName: null,
    name: null,
    departments: [],
    supervisors: [],
    firstName: '',
    lastName: '',
    työpaikkaohjaajaEmail: '',

    // Degree data
    degreeName: null,
    degreeDescription: null,
    diaryNumber: null,
    regulationDate: null,
    validFrom: null,
    expiry: null,
    transitionEnds: null,

    // Setter functions
    setRole: (role) => set({ role }),
    setEmail: (email) => set({ email }),
    setEmailError: (value) => set({ emailError: value }),
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
    setOpenNotificationModal: (openNotificationModal) => set({ openNotificationModal }),

    // Workplace setters
    setBusinessId: (value) => set({ businessId: value }),
    setBusinessIdError: (value) => set({ businessIDError: value }),
    setName: (value) => set({ name: value }),
    setDepartmentName: (value) => set({ departments: value }),
    setEditedCompanyName: (value) => set({ editedCompanyName: value }),
    setSupervisors: (value) => set({ supervisors: value }),

    setFirstName: (value) => set({ firstName: value }),
    setLastName: (value) => set({ lastName: value }),
    setTyöpaikkaohjaajaEmail: (value) => set({ työpaikkaohjaajaEmail: value }),

    // Degree setters
    setDegreeName: (degreeName) => set({ degreeName }),
    setDegreeDescription: (degreeDescription) => set({ degreeDescription }),
    setDiaryNumber: (diaryNumber) => set({ diaryNumber }),
    setRegulationDate: (regulationDate) => set({ regulationDate }),
    setValidFrom: (validFrom) => set({ validFrom }),
    setExpiry: (expiry) => set({ expiry }),
    setTransitionEnds: (transitionEnds) => set({ transitionEnds }),

    // Reset functions
    resetDegreeData: () => set({
      degreeName: null,
      degreeDescription: null,
      diaryNumber: null,
      regulationDate: null,
      validFrom: null,
      expiry: null,
      transitionEnds: null,
    }),

    resetWorkplaceData: () => set({
      businessId: '',
      businessIDError: '',
      editedCompanyName: null,
      name: null,
      departments: [],
      supervisors: [],
      firstName: '',
      lastName: '',
      työpaikkaohjaajaEmail: '',
    }),

    resetForm: () => set({
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
  };
});

export default useStore;


