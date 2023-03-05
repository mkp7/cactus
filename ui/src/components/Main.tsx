import React, {useEffect} from 'react'

import {Button} from '../elements'
import useStore from '../store'
import { SideCar } from '../types'

export const Main = (props : {}) => {
  let {isSidecarOpen, setIsSidecarOpen, setSidecarContent} = useStore(state => state)
  
  const handleClick = () => {
    setIsSidecarOpen(true)
		setSidecarContent(SideCar.API)
  }

  return (
    <main className="px-4 py-8">
      <Button onClick={handleClick}>Modal</Button>
      
    </main>
  )
}

export default Main
