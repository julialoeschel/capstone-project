import React from 'react'
import styled from 'styled-components'
import Tag from '../Tag/Tag'

type SearchTagsProps = {
  getTag: (x: string) => void
}

export default function SearchTags({ getTag }: SearchTagsProps): JSX.Element {
  function getSearch(search: string) {
    getTag(search)
    return search
  }

  return (
    <>
      <SearchTagContainer>
        <SearchTagText>what are you looking for?</SearchTagText>
        <Tag active={false} getSearch={getSearch}>
          Hotel
        </Tag>
        <Tag active={false} getSearch={getSearch}>
          Restaurant
        </Tag>
        <Tag active={false} getSearch={getSearch}>
          Cafe
        </Tag>
        <Tag active={false} getSearch={getSearch}>
          Bar
        </Tag>
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
