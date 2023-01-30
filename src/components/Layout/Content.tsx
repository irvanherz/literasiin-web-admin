import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
max-width: 1600px;
margin: 0 auto;
`

type ContentProps = {
  children: ReactNode
}

export default function Content ({ children }: ContentProps) {
  return (
    <Container>
      {children}
    </Container>
  )
}
