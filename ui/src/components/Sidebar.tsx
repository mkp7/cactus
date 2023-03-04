import React from 'react'
import {AiOutlinePlus as Plus} from 'react-icons/ai'

import {Button} from '../elements'

const Sidebar = (props : {}) => {
  return (
    <div className="px-4 py-8">
      <Button primary className="mx-auto block flex items-center space-x-2">
        <Plus size={20} />
        <span>New Collection</span></Button>
    </div>
  )
}

export default Sidebar
