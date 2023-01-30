import { CSSProperties, ReactNode } from 'react'
import styled from 'styled-components'

type PageWidthAdapterProps = {
  children: ReactNode,
  className?: string,
  style?: CSSProperties,
}
const PageWidthAdapterContainer = styled.div`
max-width: 1600px;
padding: 0 20px;
margin: 0 auto;
@media only screen and (min-width: 768px) {
  padding: 0 60px;
}
@media only screen and (min-width: 1080px) {
  padding: 0 100px;
}
`

export default function PageWidthAdapter ({ children, className, style }: PageWidthAdapterProps) {
  return (
    <PageWidthAdapterContainer className={className} style={style}>
      {children}
    </PageWidthAdapterContainer>
  )
}
