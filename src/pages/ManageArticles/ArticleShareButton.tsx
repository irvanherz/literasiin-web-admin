import { Modal } from 'antd'
import { cloneElement, ReactElement, useState } from 'react'
import styled from 'styled-components'
import ArticleShareSegment from './ArticleShareSegment'

const StyledModal = styled(Modal)`
.ant-modal-title {
  text-align: center;
  padding-bottom: 16px;
}
`

type ArticleShareButtonProps = {
  article: any
  children: ReactElement
}

export default function ArticleShareButton ({ article, children }: ArticleShareButtonProps) {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      {cloneElement(children, { onClick: handleOpen })}
      <StyledModal
        open={open}
        title='Share This Article'
        centered
        footer={null}
        onCancel={handleClose}
        closable={false}
      >
        <ArticleShareSegment article={article} />
      </StyledModal>
    </>
  )
}
