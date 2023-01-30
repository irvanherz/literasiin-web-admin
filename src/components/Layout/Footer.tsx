import styled from 'styled-components'
import PageWidthAdapter from '../PageWidthAdapter'

const StyledPageWidthAdapter = styled(PageWidthAdapter)`
.footer-wrapper {
  padding: 32px 0;
}
`
export default function Footer () {
  return (
    <StyledPageWidthAdapter className="adapter">
      <div className="footer-wrapper">Footer</div>
    </StyledPageWidthAdapter>
  )
}
