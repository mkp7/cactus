import { create } from 'zustand'

import { SideCarContent } from './types'
import { SideCar } from './types'

const useStore = create((set) => ({
  isSidecarOpen: false,
	sidecarContent: null,
  setIsSidecarOpen: (isSidecarOpen) =>  set({ isSidecarOpen  }),
	setSidecarContent: (sidecarContent: SideCar) => set({ sidecarContent }),
}))

export default useStore