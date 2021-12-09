import React from 'react'
import styled from 'styled-components'
import Tag from '../Tag/Tag'

export default function SearchTags(): JSX.Element {
  return (
    <>
      <SearchTagContainer>
        <SearchTagText>what are you looking for?</SearchTagText>
        <Tag>Hotel</Tag>
        <Tag>Restaurant</Tag>
        <Tag>Cafe</Tag>
        <Tag>Bar</Tag>
      </SearchTagContainer>
    </>
  )
}

const SearchTagContainer = styled.section`
  margin-bottom: 0.5em;
`

const SearchTagText = styled.h2`
  font-weight: lighter;
`
