import { Layout, theme } from 'antd'
import { ReactNode } from 'react'
import styled from 'styled-components'
import Content from './Content'
import Footer from './Footer'
import Header from './Header'

type LayoutDefaultProps = {
  children: ReactNode,
  searchComponent?: ReactNode,
}

export default function LayoutDefault ({ children, searchComponent }: LayoutDefaultProps) {
  const { token } = theme.useToken()
  const StyledLayout = styled(Layout)`
  .top {
    min-height: 100vh;
  }
  .ant-layout-header {
    padding: 0;
  }
  .ant-layout-content {
    padding: 0;
  }
  .ant-layout-footer {
    background: ${token.colorBgContainer};
    padding: 0;
  }
  `
  return (
    <StyledLayout>
      <div className='top'>
        <Layout.Header>
          <Header searchComponent={searchComponent} />
        </Layout.Header>
        <Layout.Content>
          <Content>
            {children}
          </Content>
        </Layout.Content>
      </div>
      <Layout.Footer>
        <Footer />
      </Layout.Footer>
    </StyledLayout>
  )
}
