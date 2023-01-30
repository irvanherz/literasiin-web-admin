import { Typography } from 'antd'
import { ReactNode } from 'react'
import styled from 'styled-components'
import PageWidthAdapter from '../PageWidthAdapter'

type ScaffoldProps = {
  title?: ReactNode,
  description?: ReactNode,
  actions?: ReactNode[],
  extra?: ReactNode,
  children?: ReactNode,
}

const ScaffoldContainer = styled.div``
export default function Scaffold ({ title, description, actions, extra, children }: ScaffoldProps) {
  return (
    <ScaffoldContainer>
      <div style={{ background: '#AAA' }}>
        <PageWidthAdapter style={{ display: 'flex', background: '#AAA' }}>
          <div style={{ flex: 1 }}>
            <Typography.Title level={2}>{title}</Typography.Title>
            <Typography.Paragraph>{description}</Typography.Paragraph>
          </div>
          <div style={{ flex: 0 }} />
        </PageWidthAdapter>
      </div>
      <div>
        <PageWidthAdapter style={{ display: 'flex', background: '#AAA' }}>
          sssss
        </PageWidthAdapter>
      </div>
      {children && (
        <PageWidthAdapter>
          {children}
        </PageWidthAdapter>
      )}
    </ScaffoldContainer>
  )
}
