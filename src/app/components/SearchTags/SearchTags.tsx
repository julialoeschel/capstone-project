import React from 'react'
import styled from 'styled-components'
import Tag from '../Tag/Tag'

export default function SearchTags(): JSX.Element {
  return (
    <>
      <SearchTagContainer>
        <Tag>Hotel</Tag>
        <Tag>Restaurant</Tag>
        <Tag>Cafe</Tag>
        <Tag>Bar</Tag>
      </SearchTagContainer>
    </>
  )
}

const SearchTagContainer = styled.section``
