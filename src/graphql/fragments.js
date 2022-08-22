import gql from 'graphql-tag'

export const postFragment = gql`
  fragment PostData on RootQueryToPostConnection {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        title
        date
        slug
        jobTitleInput
        jobLocationInput
        jobWorkdayInput
        postBannerImg
        excerpt
        content
        categories {
          edges {
            node {
              id
              name
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`

export const categoriesFragment = gql`
  fragment CategoryData on RootQueryToCategoryConnection {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        name
        slug
      }
    }
  }
`


export const announcementFragment = gql`
  fragment AnnouncementData on RootQueryToAnnouncementConnection {
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        title
        date
        slug
        content
      }
    }
  }
`


