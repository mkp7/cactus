import { useState } from 'react'

import {Sidebar} from './components'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex">
      <div className="w-1/4 bg-red-100 h-screen">
        <Sidebar />
      </div>
      <div className="w-3/4 bg-blue-100 h-screen">

      </div>
    </div>
  )
}

export default App
