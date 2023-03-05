import React, { useEffect, useState } from 'react'
import {AiOutlinePlus as Plus, AiFillFolder as Folder, AiFillFolderOpen as FolderOpen} from 'react-icons/ai'

import useStore from '../store'
import {Button} from '../elements'
import Sidecar from './Sidecar'
import { SideCar } from '../types'
import axios from '../axios'


const Sidebar = (props : {}) => {
  const {isSidecarOpen, setIsSidecarOpen, setSidecarContent, selectedCollection, setSelectedCollection} = useStore(state => state)
	const [collections, setCollections] = useState([])

	useEffect(() => {
      axios.get("/collections").then(res => {
			setCollections(res.data.data)				
			}).catch(err => {
				console.log(err);
			})
	}, [])

	const handleNewCollection = () => {
		setIsSidecarOpen(true)
		setSidecarContent(SideCar.NEW_COLLECTION)
  }

	const handleClick = () => {
    setIsSidecarOpen(true)
  }
	const handleCollectionClick = (id) => {
     setSelectedCollection(id)
	}
  const closeModal = () => {
    setIsSidecarOpen(false)
  }


  return (
			<div className="px-4 py-8">
				<div className="my-6">
					{
						collections.map(collection => {
							const active = selectedCollection === collection.id ? 'bg-gray-300' : ''
							return (
								<a className={`px-4 py-3 flex items-center space-x-2 rounded ${active}`} onClick={() => handleCollectionClick(collection.id)} key={collection.id}>
									<Folder />
									<span>{collection.name}</span>
								</a>
							)
						})
					}
				</div>
	
				<Button primary className="mx-auto block flex items-center space-x-2" onClick={handleNewCollection}>
					<Plus size={20} />
					<span>New Collection</span></Button>
			</div>
  )
}

export default Sidebar
