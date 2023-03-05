import React from 'react'
import {AiOutlinePlus as Plus} from 'react-icons/ai'

import useStore from '../store'
import {Button} from '../elements'
import Sidecar from './Sidecar'
import { SideCar } from '../types'


const Sidebar = (props : {}) => {
  let {isSidecarOpen, setIsSidecarOpen, setSidecarContent} = useStore(state => state)

	const handleNewCollection = () => {
		setIsSidecarOpen(true)
		setSidecarContent(SideCar.NEW_COLLECTION)
  }

	const handleClick = () => {
    setIsSidecarOpen(true)
  }
  const closeModal = () => {
    setIsSidecarOpen(false)
  }


  return (
			<div className="px-4 py-8">
				<Button primary className="mx-auto block flex items-center space-x-2" onClick={handleNewCollection}>
					<Plus size={20} />
					<span>New Collection</span></Button>
			</div>
  )
}

export default Sidebar
