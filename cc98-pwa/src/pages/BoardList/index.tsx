import React, { useState } from 'react'
import styled from 'styled-components'

import useFetcher from '@/hooks/useFetcher'

import BoardGroup from './BoardGroup'
import BoardItem from './BoardItem'

import { getBoardsInfo } from '@/services/board'
import { navigateHandler } from '@/services/utils/errorHandler'

import { throttle } from 'lodash-es'

import SearchInput from '@/components/SearchInput'
import StickyBar from '@/components/StickyBar'

import { IBasicBoard } from '@cc98/api'

const SearchDiv = styled.div`
  margin: 24px 10px;
`

const EmptyDiv = styled.div`
  height: 110px;
`

export default () => {
  const [childBoards, setChildBoards] = useState<IBasicBoard[]>([])
  const [boardList] = useFetcher(getBoardsInfo, {
    success: boards => {
      setChildBoards(
        boards.map(baseBoard => baseBoard.boards).reduce((prev, cur) => cur.concat(prev))
      )
    },
    fail: navigateHandler,
  })

  // 版面搜索
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBoards, setFilteredBoards] = useState<IBasicBoard[]>([])

  const onSearchTermChange = throttle((value: string) => {
    setSearchTerm(value)
    setFilteredBoards(childBoards.filter(board => board.name.indexOf(value) !== -1))
  }, 250)

  return (
    <>
      <StickyBar>
        <SearchInput placeholder="搜索版面" onChange={onSearchTermChange} />
      </StickyBar>
      {searchTerm ? (
        <SearchDiv>
          {filteredBoards.map(board => (
            <BoardItem key={board.id} boardInfo={board} />
          ))}
        </SearchDiv>
      ) : (
        <>
          {boardList &&
            boardList.map(boardGroup => <BoardGroup key={boardGroup.id} boardsInfo={boardGroup} />)}
          <EmptyDiv />
        </>
      )}
    </>
  )
}
