import { useState } from 'react'
import { Dialog } from '@headlessui/react'

import {Sidebar, Main} from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex">
      <div className="w-1/4 bg-slate-200 h-screen">
        <Sidebar />
      </div>
      <div className="w-3/4 bg-slate-50 h-screen">
        <Main />
      </div>
    </div>
  )
}

export default App
