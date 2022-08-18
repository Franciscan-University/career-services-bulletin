import React from 'react'
import GridView from './GridView'
import ListView from './ListView'
import PrintView from './PrintView'
import Query from 'react-apollo/Query'
import Typography from '@material-ui/core/Typography'
import Loader from '../Loader'

const AnnouncementRenderer = ({ viewtype, query, announcements, variables, searchannouncements }) => {
  const grid = viewtype === 'grid'

  return announcements == null ? (
    <Query notifyOnNetworkStatusChange query={query} variables={variables}>
      {({ data, loading, error, fetchMore }) => {
        if (error) return <p>{error.message}</p>
        const announcements = searchannouncements || data.announcements
        if (loading && !announcements) return <Loader />

        if (announcements && !announcements.edges.length) {
          return (
            <Typography>
              No current announcements found for the given criteria.
            </Typography>
          )
        }

        const loadMore = () => {
          if (searchannouncements) return
          fetchMore({
            variables: {
              after: announcements.pageInfo.endCursor
            },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              const newEdges = fetchMoreResult.announcements.edges
              const pageInfo = fetchMoreResult.announcements.pageInfo

              return newEdges.length
                ? {
                  announcements: {
                    __typename: prevResult.announcements.__typename,
                    edges: [...prevResult.announcements.edges, ...newEdges],
                    pageInfo
                  }
                }
                : prevResult
            }
          })
        }

        return (
          <>
            {viewtype === 'print' && (
              <PrintView
                loading={loading}
                announcements={announcements}
                loadDone={false}
                onLoadMore={loadMore}
              />
            )}
            {grid && (
              <GridView
                loading={loading}
                announcements={announcements}
                loadDone={false}
                onLoadMore={loadMore}
              />
            )}
            {!grid && viewtype !== 'print' && (
              <ListView
                loading={loading}
                announcements={announcements}
                loadDone={false}
                onLoadMore={loadMore}
              />
            )}
          </>
        )
      }}
    </Query>
  ) : (
    <div>
      {viewtype === 'print' && <PrintView announcements={announcements} loadDone />}
      {grid && <GridView announcements={announcements} loadDone />}
      {!grid && viewtype !== 'print' && <ListView announcements={announcements} loadDone />}
    </div>
  )
}

export default AnnouncementRenderer
