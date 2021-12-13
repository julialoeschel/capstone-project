import React, { useState } from 'react'
import type { ReactNode } from 'react'
import styled from 'styled-components'

type TagProps = {
  children: ReactNode
  active: boolean
}
export default function Tag({ children }: TagProps): JSX.Element {
  const [btnClicked, setBtnClicked] = useState<boolean>(false)

  function handleClick() {
    setBtnClicked(!btnClicked)
    if (children === 'Hotel') {
      localStorage.setItem('ActiveSearchTag', '19014')
    } else if (children === 'Restaurant') {
      localStorage.setItem('ActiveSearchTag', '13065')
    } else if (children === 'Cafe') {
      localStorage.setItem('ActiveSearchTag', '13032')
    } else if (children === 'Bar') {
      localStorage.setItem('ActiveSearchTag', '13003')
    }
  }

  return (
    <>
      <Tags
        active={btnClicked}
        onClick={() => {
          handleClick()
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
