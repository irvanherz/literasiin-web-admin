import { Card } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const StyledCard = styled(Card)`
width: 100%;
.cover-wrapper {
  position: relative;
  padding-top: 150%;
  img {
    position: absolute;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
`
export default function StoryCard () {
  return (
    <Link to="/stories/1">
      <StyledCard
        cover={
          <div className="cover-wrapper">
            <img src="https://i.pinimg.com/736x/d5/91/22/d5912249a0d618675563861a615538c2.jpg" />
          </div>
        }
      >
        <Card.Meta
          title="Title"
          description="Desc"
        />
      </StyledCard>
    </Link>

  )
}
