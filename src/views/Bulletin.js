import React from 'react'
import { getAllPosts } from '../graphql/queries/posts'
import dayjs from 'dayjs'
import Layout from '../components/Layout/index'
import GridRenderer from '../components/GridTypes/GridRenderer'
import { Helmet } from 'react-helmet'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'

const week = dayjs().subtract(7, 'day')

const Bulletin = ({ data, viewtype, searchposts }) => {
  return (
    <Layout>
      <RenderHome data={data} viewtype={viewtype} searchposts={searchposts} />
      <span />
    </Layout>
  )
}


const RenderHome = props => {
  return (
    <div>
      <Helmet>
        <title>Home | Bulletin - Franciscan University of Steubenville</title>
      </Helmet>
      <Typography variant='h6' gutterBottom>
        All Job Postings
      </Typography>
      <GridRenderer
        query={getAllPosts}
        variables={{
          first: 10,
          /*where: {
            dateQuery: {
              after: {
                day: week.date(),
                month: week.month() + 1,
                year: week.year()
              }
            }
          }*/
        }}
        {...props}
      />
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to={`/all`} className='view-all-posts'>
          <Button variant='text' className='view-all-button'>
            View More
          </Button>
        </Link>
      </Box>
    </div>
  )
}

var getNoPrintBtn = document.getElementsByClassName('no-print');
var getPostsBtn = document.getElementsByClassName('view-all-posts')

function printBtnListener() {
  if (getNoPrintBtn != null) {
    for (var i=0; i<getNoPrintBtn.length; i++) {
      if (getNoPrintBtn[i].style.position == 'absolute') {
        for (var j=0; j<getPostsBtn.length; j++) {
          getPostsBtn[j].style.display = 'none';
        }
      }
      else {
        for (var j=0; j<getPostsBtn.length; j++) {
          getPostsBtn[j].style.display = 'initial';
        }
      }
    }
  }
}

setInterval(printBtnListener, 100);

export default Bulletin
