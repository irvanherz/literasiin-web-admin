import { ArrowLeftOutlined } from '@ant-design/icons'
import { Space, theme, Typography } from 'antd'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { CSSProperties } from 'styled-components'
import PageWidthAdapter from '../PageWidthAdapter'

type LayoutScaffoldProps = {
  withHeader?: boolean,
  title?: ReactNode,
  description?: ReactNode,
  style?: CSSProperties,
  actions?: ReactNode[],
  extra?: ReactNode,
  headerStyle?: CSSProperties,
  headerClassName?: string,
  extraStyle?: CSSProperties,
  extraClassName?: string,
  children?: ReactNode,
  bodyStyle?: CSSProperties,
  bodyClassName?: string,
}

export default function LayoutScaffold ({ withHeader = true, headerStyle, headerClassName, title, description, actions, style, extra, extraStyle, extraClassName, children, bodyStyle, bodyClassName }: LayoutScaffoldProps) {
  const navigate = useNavigate()
  const { token } = theme.useToken()

  const handleBack = () => navigate(-1)

  const ScaffoldContainer = styled.div`
    .scaffold-header {
      background: ${token.colorBgContainer};
      padding: 12px 0;
      .scaffold-header-title {
        margin-bottom: 8px;
        font-size: 21px;
      }
      .scaffold-header-description {
        margin-bottom: 0;
      }
      .back-button {
        cursor: pointer;
        display: block;
        color: ${token.colorTextBase};
        background: none;
        padding: 0;
        border: none;
        margin-bottom: ${token.marginSM}px;
        @media only screen and (min-width: ${token.screenMDMin}px) {
          margin-left: -30px;
        }
        .back-button-icon {
          width: 30px;
          padding-right: ${token.padding}px;
        }
      }
    }
    .scaffold-extra {
      background: ${token.colorBgContainerDisabled};
      padding: 12px 0;
    }
  `

  return (
    <ScaffoldContainer style={style}>
      {withHeader && (
        <div style={headerStyle} className={classNames('scaffold-header', headerClassName)}>
          <PageWidthAdapter style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <button className='back-button' onClick={handleBack}>
                <span className='back-button-icon'><ArrowLeftOutlined /></span>
                <span className='back-button-text'>Back</span>
              </button>
              <Typography.Title level={2} className='scaffold-header-title'>{title}</Typography.Title>
              <Typography.Paragraph className='scaffold-header-description'>{description}</Typography.Paragraph>
            </div>
            <div style={{ flex: 0 }}>{<Space>{actions}</Space>}</div>
          </PageWidthAdapter>
        </div>
      )}

      {extra && (
        <div style={extraStyle} className={classNames('scaffold-extra', extraClassName)}>
          <PageWidthAdapter>
            {extra}
          </PageWidthAdapter>
        </div>
      )}

      {children && (
        <div style={bodyStyle} className={classNames('scaffold-body', bodyClassName)}>
          <PageWidthAdapter>
            {children}
          </PageWidthAdapter>
        </div>
      )}
    </ScaffoldContainer>
  )
}
