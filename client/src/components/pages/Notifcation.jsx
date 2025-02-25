import React from 'react'
import '../Styles/Notification.css'

function Notifcation({openNotification}) {
  return (
    <div className={`notification-container ${openNotification? 'opeen': ''}`}>

    </div>
  )
}

export default Notifcation