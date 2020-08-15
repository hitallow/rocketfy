import React from 'react'
import PropTypes from 'prop-types'
import { MdAdd } from 'react-icons/md'
import { Container } from './styles'
import Card from '../Card'

function List({ data, index: listIndex }) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff" />
          </button>
        )}
      </header>
      <ul>
        {data.cards.map((card, index) => (
          <Card {...card} key={card.id} index={index} listIndex={listIndex} />
        ))}
      </ul>
    </Container>
  )
}
// add prop types validation
List.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
}
export default List
