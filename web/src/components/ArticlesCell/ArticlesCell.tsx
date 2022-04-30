import type { ArticlesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return (
    <>
      {articles.map(({ id, title, body, createdAt }) => (
        <article
          key={id}
          style={{
            display: 'inline-block',
            width: '220px',
            marginInline: '32px',
          }}
        >
          <header>
            <h2>
              <Link to={routes.article({ id })}>{title}</Link>
            </h2>
            <p>{body}</p>
            <div>
              <sub>Posted at: {createdAt}</sub>
            </div>
          </header>
        </article>
      ))}
    </>
  )
}
