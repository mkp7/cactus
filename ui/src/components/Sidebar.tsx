import React from 'react'
import {AiOutlinePlus} from 'react-icons/ai'

import {Button} from '../elements'

const Sidebar = (props : {}) => {
  return (
    <div className="px-4 py-8">
      <Button primary className="mx-auto block">New Collection</Button>
    </div>
  )
}

export default Sidebar
