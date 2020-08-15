import React, { useRef, useContext } from 'react'
import { Container, Label } from './styles'
import { useDrag, useDrop } from 'react-dnd'
import propTypes from 'prop-types'
import BoardContext from '../Board/context'

export default function Card({ content, labels, user, id, index, listIndex }) {
  const customRef = useRef()
  const { move } = useContext(BoardContext)

  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: 'CARD',
      index,
      listIndex,
      id,
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  })

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover: (item, monitor) => {
      const targetListIndex = listIndex
      const draggedListIndex = item.listIndex

      const { index: draggedIndex } = item
      const targetIndex = index

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex)
        return

      const targetSize = customRef.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top) / 2

      const draggedOffset = monitor.getClientOffset()
      const draggedTop = draggedOffset.y - targetSize.top

      if (draggedIndex < targetIndex && draggedTop < targetCenter) return

      if (draggedIndex > targetIndex && draggedTop > targetCenter) return

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex)

      item.index = targetIndex
      item.listIndex = targetListIndex
    },
  })

  dragRef(dropRef(customRef))

  return (
    <Container ref={customRef} isDragging={isDragging}>
      <header>
        {labels && labels.map((label) => <Label key={label} color={label} />)}
      </header>
      <p>{content}</p>
      {user && <img src={user} alt="Avatar of user" />}
    </Container>
  )
}

Card.propTypes = {
  content: propTypes.string,
  labels: propTypes.array,
  user: propTypes.string,
  id: propTypes.number,
  index: propTypes.number,
  listIndex: propTypes.number,
}
