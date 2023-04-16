import { Typography } from 'antd'
import ArticleImage from 'components/ArticleImage'

type ArticleDetailsTabProps = {
  article: any
}
export default function ArticleDetailsTab ({ article }: ArticleDetailsTabProps) {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <Typography.Title>{article?.title}</Typography.Title>
        <Typography.Text>{article?.description}</Typography.Text>
      </div>
      <div style={{ maxWidth: 500, margin: '0 auto' }}><ArticleImage article={article} /></div>
      <div dangerouslySetInnerHTML={{ __html: article?.content || '' }}></div>
    </div>
  )
}
