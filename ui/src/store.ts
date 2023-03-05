import { create } from 'zustand'

import { SideCarContent } from './types'
import { SideCar } from './types'

const useStore = create((set) => ({
  isSidecarOpen: false,
	sidecarContent: null,
	selectedCollection: null,
  setIsSidecarOpen: (isSidecarOpen) =>  set({ isSidecarOpen  }),
	setSidecarContent: (sidecarContent: SideCar) => set({ sidecarContent }),
	setSelectedCollection: (selectedCollection: string) => set({ selectedCollection }),
}))

export default useStore