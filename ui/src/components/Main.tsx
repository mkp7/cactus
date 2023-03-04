import React, {useEffect} from 'react'

import {Button} from '../elements'
import useStore from '../store'
import Sidecar from './Sidecar'

export const Main = (props : {}) => {
  let {isSidecarOpen, setIsSidecarOpen} = useStore(state => state)
  useEffect(() => {
    console.log({isSidecarOpen})
  }, [isSidecarOpen])

  const handleClick = () => {
    setIsSidecarOpen(true)
  }
  const closeModal = () => {
    setIsSidecarOpen(false)
  }

  return (
    <main className="px-4 py-8">
      <Button onClick={handleClick}>Modal</Button>
      <Sidecar isOpen={isSidecarOpen} onClose={closeModal}>
        <h1>hello</h1>
      </Sidecar>
    </main>
  )
}

export default Main
