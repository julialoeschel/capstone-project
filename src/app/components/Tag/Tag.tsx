import React, { useState } from 'react'
import type { ReactNode } from 'react'
import styled from 'styled-components'

type TagProps = {
  children: ReactNode
  active: boolean
}
export default function Tag({ children }: TagProps): JSX.Element {
  const [search, setSearch] = useState('')
  const [btnClicked, setBtnClicked] = useState<boolean>(false)

  function whatIsClicked() {
    if (children === 'Hotel') {
      setSearch('Hotel')
    } else if (children === 'Restaurant') {
      setSearch('Restaurant')
    } else if (children === 'Cafe') {
      setSearch('Cafe')
    } else if (children === 'Bar') {
      setSearch('Bar')
    }
    console.log(search)
  }

  return (
    <>
      <Tags
        active={btnClicked}
        onClick={() => {
          whatIsClicked()
          setBtnClicked(!btnClicked)
        }}
      >
        {children}
      </Tags>
    </>
  )
}

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
