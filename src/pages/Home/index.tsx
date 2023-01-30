import { List, Space } from 'antd'
import styled from 'styled-components'
import Layout from '../../components/Layout'
import StoryCard from '../../components/StoryCard'
import Banner from './Banner'

const StyledList = styled(List)`
.ant-list-item {
  padding: 8px;
}
`
export default function Home () {
  return (
    <Layout.Default>
      <Layout.Scaffold withHeader={false}>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Banner />
          <StyledList
            grid={{ column: 4, gutter: 8 }}
            dataSource={[1, 2, 3, 4, 5, 6, 7]}
            renderItem={story => (
              <List.Item>
                <StoryCard />
              </List.Item>

            )}
          />
        </Space>

      </Layout.Scaffold>

    </Layout.Default>
  )
}
