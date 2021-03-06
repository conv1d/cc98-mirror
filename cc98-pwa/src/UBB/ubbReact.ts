import React from 'react'
import UBBCore from '@cc98/ubb-core'

import handlerHub from './handlerHub'
import { IContext } from '@cc98/context'

import { IMG_BASE_URL } from '@/config'
import { ModeEnum } from '@/theme'

import './style.css'

const defaultContext: IContext = {
  mode: ModeEnum.LIGHT,
  imgBaseURL: IMG_BASE_URL,
}

export default function UBBReact(ubbText: string, context?: Partial<IContext>) {
  return UBBCore<React.ReactNode>(ubbText, handlerHub, {
    ...defaultContext,
    ...context,
  })
}
