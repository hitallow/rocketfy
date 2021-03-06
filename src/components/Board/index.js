import React, { useState, useEffect } from 'react'
import produce from 'immer'
import List from '../List'
import BoardContext from './context'

import { loadLists } from '../../services/api'
import { Container } from './styles'

export default function Board() {
  const [lists, setLists] = useState([])

  useEffect(() => {
    setLists(loadLists())
  }, [])

  function move(fromList, toList, from, to) {
    setLists(
      produce(lists, (draft) => {
        const draggedElement = draft[fromList].cards[from]
        draft[fromList].cards.splice(from, 1)
        draft[toList].cards.splice(to, 0, draggedElement)
      })
    )
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} data={list} index={index} />
        ))}
      </Container>
    </BoardContext.Provider>
  )
}
