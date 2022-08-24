import React from 'react'
import { getAllPosts } from '../graphql/queries/posts'
import dayjs from 'dayjs'
import Layout from '../components/Layout/index'
import AnnouncementRenderer from '../components/GridTypes/AnnouncementRenderer'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { getAllAnnouncements } from '../graphql/queries/announcements'

const week = dayjs().subtract(7, 'day')

const Bulletin = ({ data, viewtype, searchposts }) => {
  return (
    <Layout>
      <RenderHome data={data} viewtype={viewtype} searchposts={searchposts} />
      <span />
    </Layout>
  )
}

console.log(viewtype)

const RenderHome = props => {
  return (
    <div>
      <Helmet>
        <title>Home | Bulletin - Franciscan University of Steubenville</title>
      </Helmet>
      <Typography variant='h6' gutterBottom>
        Current Bulletin
      </Typography>
      <AnnouncementRenderer
        query={getAllAnnouncements}
        variables={{
          first: 50,
          where: {
            dateQuery: {
              after: {
                day: week.date(),
                month: week.month() + 1,
                year: week.year()
              }
            }
          }
        }}
        {...props}
      />
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to={`/all`} className='view-all-posts'>
          <Button variant='text' className='view-all-button'>
            View Job Board
          </Button>
        </Link>
      </Box>
    </div>
  )
}

export default Bulletin
