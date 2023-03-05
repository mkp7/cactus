import { useState } from 'react'
import { Dialog } from '@headlessui/react'

import {Sidebar, Main} from './components'
import useStore from './store'
import Sidecar from './components/Sidecar'


function App() {
  const [count, setCount] = useState(0)
	let {isSidecarOpen, setIsSidecarOpen} = useStore(state => state)
  
  const handleClick = () => {
    setIsSidecarOpen(true)
  }
  const closeModal = () => {
    setIsSidecarOpen(false)
  }

  return (
		<>
    <div className="flex">
      <div className="w-1/4 bg-slate-100 h-screen border-r-2 border-gray-400" style={{minWidth: 240}}>
        <Sidebar />
      </div>
      <div className="w-full bg-slate-50 h-screen">
        <Main />
      </div>
    </div>
		<Sidecar isOpen={isSidecarOpen} onClose={closeModal}/>
		</>
  )
}

export default App
