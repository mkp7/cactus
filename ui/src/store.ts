import { create } from 'zustand'

const useStore = create((set) => ({
  isSidecarOpen: false,
  setIsSidecarOpen: (isSidecarOpen) =>  set({ isSidecarOpen  }),
}))

export default useStore
