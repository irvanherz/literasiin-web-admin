import { DEFAULT_IMAGE } from 'libs/variables'
import { DetailedHTMLProps, ImgHTMLAttributes, useMemo } from 'react'
import styled, { CSSProperties } from 'styled-components'

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
`

type StoryCoverProps = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  story?: any
  containerStyle?: CSSProperties
  containerClassName?: string
}
export default function StoryCover ({ story, containerStyle, containerClassName, ...props }: StoryCoverProps) {
  const src = useMemo(() => {
    const cover = story?.cover
    const objects: any[] = cover?.meta?.objects || []
    const md = objects.find(object => object.id === 'md')
    return md?.url || DEFAULT_IMAGE
  }, [story])

  return (
    <CoverWrapper style={containerStyle} className={containerClassName}>
      <img src={src} {...props}/>
    </CoverWrapper>
  )
}
