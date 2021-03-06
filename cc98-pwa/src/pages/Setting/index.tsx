import React from 'react'

import { List } from '@material-ui/core'

// import Signalr from './Signalr'
import Theme from './Theme'
import Mode from './Mode'
import Cache from './Cache'
import Compress from './Compress'
import Notification from './Notification'
import CustomHome from './Home'

const Setting: React.FC = () => (
  <List>
    {/* <Signalr /> */}
    <Theme />
    <CustomHome />
    <Mode />
    <Notification />
    <Compress />
    <Cache />
  </List>
)

export default Setting
