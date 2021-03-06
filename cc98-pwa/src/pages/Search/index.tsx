import React, { useState, useEffect } from 'react'

import muiStyled from '@/muiStyled'
import { InfTopicList } from '@/components/TopicList'
import SearchInput from '@/components/SearchInput'
import StickyBar from '@/components/StickyBar'

import useFetcher from '@/hooks/useFetcher'
import { navigate } from '@/utils/history'
import { searchTopics } from '@/services/topic'
import { getUserInfoById, getUserInfoListByName } from '@/services/user'

import InfUserList from './compoents'

import { Tab, Tabs } from '@material-ui/core'

import { throttle } from 'lodash-es'

const StickyBarS = muiStyled(StickyBar)({
})

export default () => {
  const [current, setCurrent] = useState('topic')
  const [search, setSearch] = useState('')

  const onSearch = throttle((value: string) => {
    setSearch(value)
  }, 1000 * 10)

  const handleChange = (_: React.ChangeEvent, value: string) => {
    setSearch('')
    setCurrent(value)
  }

  return (
    <>
      <StickyBar>
        <SearchInput placeholder="搜索主题或用户（限制10s一次）" onSearch={onSearch} />
      </StickyBar>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
        value={current}
        onChange={handleChange}
      >
        <Tab value="topic" label="搜索主题" />
        <Tab value="user" label="搜索用户" />
      </Tabs>

      {current === 'topic' && <>
        {search && (
        <InfTopicList
          key={search}
          service={(from: number) => searchTopics(search, from)}
          place="search"
        />
        )}
      </>}
      {current === 'user' && <>
        {search && (
        <InfUserList
          key={search}
          service={(from: number) => getUserInfoListByName(search, from)}
        />
        )}
      </>}
    </>
  )
}
