import React from 'react'
import styled from 'styled-components'
import Tag from '../Tag/Tag'

export default function SearchTags(): JSX.Element {
  return (
    <>
      <SearchTagContainer>
        <SearchTagText>what are you looking for?</SearchTagText>
        <Tag active={false}>Hotel</Tag>
        <Tag active={false}>Restaurant</Tag>
        <Tag active={false}>Cafe</Tag>
        <Tag active={false}>Bar</Tag>
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
