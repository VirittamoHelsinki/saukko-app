import { create } from 'zustand';

const useHeadingStore = create((set) => ({
  heading: '',
  subHeading: '',
  siteTitle: '',

  setHeading: (newHeading) => set(() => ({ heading: newHeading })),
  setSubHeading: (newSubHeading) => set(() => ({ subHeading: newSubHeading })),
  setSiteTitle: (newSiteTitle) => set(() => ({ siteTitle: newSiteTitle })),
}));

export default useHeadingStore;
