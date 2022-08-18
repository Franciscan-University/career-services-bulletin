import gql from 'graphql-tag'
import { postFragment, announcementFragment } from '../fragments'

export const getAllAnnouncements = gql`
  query getAllAnnouncements(
    $first: Int
    $after: String
    $where: RootQueryToAnnouncementConnectionWhereArgs
  ) {
    announcements(first: $first, after: $after, where: $where) {
      ...AnnouncementData
    }
  }
  ${announcementFragment}
`


export const SingleAnnouncementDetail = gql`
  query SingleAnnouncementDetail($slug: String!) {
    announcementBy(slug: $slug) {
      id
      slug
      title
      date
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
`

export const PostSearchQuery = gql`
  query AnnouncementSearchQuery($search: String!) {
    announcements(where: { search: $search }) {
      ...AnnouncementData
    }
  }
  ${announcementFragment}
`

export const FilterDateQuery = gql`
  query AnnouncementSearchQuery($year: Int, $month: Int) {
    announcements(where: { dateQuery: { year: $year, month: $month } }) {
      ...AnnouncementData
    }
  }
  ${announcementFragment}
`
