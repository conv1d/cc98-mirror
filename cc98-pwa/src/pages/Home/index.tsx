import React from 'react'

import useModel from '@/hooks/useModel'
import userModel from '@/models/user'
import settingModel from '@/models/setting'

import Info from '../Info'
import HotTopic from '../HotTopic'
import NewTopic from '../NewTopic'
import MyFollow from '../MyFollow'
import LogIn from '../LogIn'

export default () => {
  const user = useModel(userModel)
  const { customHome } = useModel(settingModel, ['customHome'])

  return (
    <>
      {user.isLogIn && (
        <>
          {customHome === 1 && <Info />}
          {customHome === 2 && <HotTopic />}
          {customHome === 3 && <NewTopic />}
          {customHome === 4 && <MyFollow />}
        </>
      )}
      {!user.isLogIn && (
        <>
          {<LogIn />}
        </>
      )}
    </>
  )
}
