import { Button } from 'antd'
import { DEFAULT_IMAGE } from 'libs/variables'
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import styled, { StyledComponentProps } from 'styled-components'
import StoryCoverMediaInput from './StoryCoverMediaInput'

const CoverWrapper = styled.div`
position: relative;
width: 100%;
padding-top: 150%;
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.cover-controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
`

type EditableStoryCoverMediaProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  wrapperProps?: StyledComponentProps<'div', any, {}, never>
  story: any
}
export default function EditableStoryCoverMedia ({ story, wrapperProps, ...props }: EditableStoryCoverMediaProps) {
  const md = story?.cover?.meta?.objects?.find((object: any) => object.id === 'md')
  return (
    <CoverWrapper {...wrapperProps}>
      <img {...props} src={md?.url || DEFAULT_IMAGE} />
      <div className='cover-controls'>
        <StoryCoverMediaInput story={story}>
          <Button>Edit</Button>
        </StoryCoverMediaInput>

      </div>
    </CoverWrapper>
  )
}
