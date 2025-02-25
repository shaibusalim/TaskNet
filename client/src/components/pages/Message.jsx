import React from 'react'
import '../Styles/Message.css'

function Message({openMessage}) {
  return (
    <div className={`message-container ${openMessage? "open": ""}`}>

    </div>
  )
}

export default Message