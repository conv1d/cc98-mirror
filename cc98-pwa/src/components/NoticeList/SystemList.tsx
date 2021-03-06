import React, { useState, useEffect } from 'react'
import muiStyled from '@/muiStyled'

import { List } from '@material-ui/core'

import SystemListItem from './SystemListItem'

import { ISystem } from '@cc98/api'

import useModel from '@/hooks/useModel'
import userModel from '@/models/user'
import stateModel from '@/models/state'
import settingModel from '@/models/setting'

const ListS = muiStyled(List)({
  width: '100%',
})

interface Props {
  data: ISystem[]
}

const SystemList: React.FC<Props> = ({ data }) => (
  <ListS>
    {data.map(x => (
      <SystemListItem key={x.id} data={x} />
    ))}
  </ListS>
)


export default ({ data }: Props) => {
  const { FRESH_READ } = userModel
  const { useNotification} = useModel(settingModel, ['useNotification'])

  function callback() {
    if (useNotification && data && data.length) {
      FRESH_READ()
    }
  }

  useEffect(() => {
    callback()
  }, [data])

  return (
    <SystemList
      data={data}
    />
  )
}

// export default SystemList
