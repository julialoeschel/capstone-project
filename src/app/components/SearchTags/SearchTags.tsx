import React, { useState } from 'react'
import styled from 'styled-components'
type TagProps = {
  active: boolean
}

export default function SearchTags(): JSX.Element {
  const [tagState, setTagState] = useState([
    { id: 'Hotel', name: 'Hotel', active: false },
    { id: 'Restaurant', name: 'Restaurant', active: false },
    { id: 'Cafe', name: 'Cafe', active: false },
    { id: 'Bar', name: 'Bar', active: false },
  ])

  if (localStorage.getItem('ActiveSearchTag') != '') {
    localStorage.getItem('ActiveSearchTag') === '19014'
      ? (tagState[0].active = true)
      : null
    localStorage.getItem('ActiveSearchTag') === '13065'
      ? (tagState[1].active = true)
      : null
    localStorage.getItem('ActiveSearchTag') === '13032'
      ? (tagState[2].active = true)
      : null
    localStorage.getItem('ActiveSearchTag') === '13003'
      ? (tagState[3].active = true)
      : null
  }

  function handleClick(id: string) {
    if (id === 'Hotel' && tagState[0].active === false) {
      localStorage.setItem('ActiveSearchTag', '19014')
      setTagState([
        { id: 'Hotel', name: 'Hotel', active: true },
        { id: 'Restaurant', name: 'Restaurant', active: false },
        { id: 'Cafe', name: 'Cafe', active: false },
        { id: 'Bar', name: 'Bar', active: false },
      ])
    } else if (id === 'Restaurant' && tagState[1].active === false) {
      localStorage.setItem('ActiveSearchTag', '13065')
      setTagState([
        { id: 'Hotel', name: 'Hotel', active: false },
        { id: 'Restaurant', name: 'Restaurant', active: true },
        { id: 'Cafe', name: 'Cafe', active: false },
        { id: 'Bar', name: 'Bar', active: false },
      ])
    } else if (id === 'Cafe' && tagState[2].active === false) {
      localStorage.setItem('ActiveSearchTag', '13032')
      setTagState([
        { id: 'Hotel', name: 'Hotel', active: false },
        { id: 'Restaurant', name: 'Restaurant', active: false },
        { id: 'Cafe', name: 'Cafe', active: true },
        { id: 'Bar', name: 'Bar', active: false },
      ])
    } else if (id === 'Bar' && tagState[3].active === false) {
      localStorage.setItem('ActiveSearchTag', '13003')
      setTagState([
        { id: 'Hotel', name: 'Hotel', active: false },
        { id: 'Restaurant', name: 'Restaurant', active: false },
        { id: 'Cafe', name: 'Cafe', active: false },
        { id: 'Bar', name: 'Bar', active: true },
      ])
    } else if (
      tagState[0].active === true ||
      tagState[1].active === true ||
      tagState[2].active === true ||
      tagState[3].active === true
    ) {
      localStorage.setItem('ActiveSearchTag', '')
      setTagState([
        { id: 'Hotel', name: 'Hotel', active: false },
        { id: 'Restaurant', name: 'Restaurant', active: false },
        { id: 'Cafe', name: 'Cafe', active: false },
        { id: 'Bar', name: 'Bar', active: false },
      ])
    }
  }
  return (
    <>
      <SearchTagContainer>
        <SearchTagText>what are you looking for?</SearchTagText>
        {tagState.map((state) => (
          <Tags onClick={() => handleClick(state.id)} active={state.active}>
            {state.name}
          </Tags>
        ))}
      </SearchTagContainer>
    </>
  )
}

const SearchTagContainer = styled.section`
  margin-bottom: 0.5em;
  overflow: auto;
  white-space: nowrap;
  height: 6.3em;
`

const SearchTagText = styled.h2`
  font-weight: lighter;
`
const Tags = styled.span<Partial<TagProps>>`
  background-color: ${(props) =>
    props.active ? 'var(--color-green-700)' : 'var(  --color-green-100)'};
  color: ${(props) =>
    props.active ? 'var(--color-green-100)' : 'var(  --color-green-700)'};
  font-weight: ${(props) => (props.active ? 'lighter' : 'normal')};
  padding: 0.3em 1em;
  border: solid 3px var(--color-green-700);
  border-radius: 1.2em;
  margin: 0.1em;
  font-size: 0.9em;
`
