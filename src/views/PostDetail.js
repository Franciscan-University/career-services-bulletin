import React from 'react'
import { graphql } from 'react-apollo'
import { SinglePostDetail } from '../graphql/queries/posts'
import Layout from '../components/Layout/index'
import Loader from '../components/Loader'
import { Helmet } from 'react-helmet'
import Typography from '@material-ui/core/Typography'
import { blue, grey } from '@material-ui/core/colors'
import { withStyles } from '@material-ui/core/styles'
import BackIcon from '@material-ui/icons/ArrowBackIos'
import AttachmentIcon from '@material-ui/icons/Attachment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import RoomIcon from '@material-ui/icons/Room';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { withRouter } from 'react-router-dom'
import SanitizedHTML from 'react-sanitized-html'
// import '../styles/app.css'

const styles = {
  card: {
    marginBottom: 15
  },
  titleColor: {
    color: '#21412a',
    fontSize: '1.8em',
    fontWeight: '500'
  },
  dateColor: {
    color: grey[500]
  },
  categoryColor: {
    color: '#998643'
  },
  media: {
    height: 250
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  jobTitleStyleFirst: {
    marginTop: '2em'
  },
  jobTitleStyle: {
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px'
  },
  iconStyle: {
    marginRight: '2px'
  },
  postContent: {
    paddingBottom: '2em'
  },
  attachmentStyle: {
    display: 'flex',
    marginBottom: '8px',
    width: 'fit-content'
  },
  backBtn: {
    marginTop: '3em'
  }
}

const PostDetail = ({ data, classes, ...props }) => {
  const isLoading = data.loading
  return (
    <Layout>
      <Helmet>
        <title>Loading... - Franciscan University of Steubenville</title>
      </Helmet>
      {isLoading && <Loader />}
      {!isLoading && <RenderPost data={data} classes={classes} {...props} />}
    </Layout>
  )
}


const RenderPost = ({ data, classes, ...props }) => {
  const post = data.postBy
  const date = new Date(post.date).toLocaleDateString()

  var docString = post.postBannerImg
  var docArray = docString.split(',');
  var docNameArray = []
  var docFileArray = []

  for (var i=0; i<docArray.length; i++) {
    var tempArray = docArray[i].split('|');
    docNameArray.push(tempArray[0]);
    docFileArray.push(tempArray[1]);
  }

  var docNameFilter = docNameArray.filter(function (el) {
    return el != '';
  })

  docNameArray = docNameFilter;

  var catArray = post.categories.edges;
  console.log(catArray);


  return (
    <div>
      <Helmet>
        <title>{post.title} - Franciscan University of Steubenville</title>
      </Helmet>
      {post.featuredImage && (
        <img
          alt=''
          style={{ height: '600px', width: '800px', objectFit: 'cover' }}
          src={post.featuredImage.sourceUrl}
        />
      )}
      <Typography type='caption' variant='h6' className={classes.categoryColor}>
        {post.categories.edges[0].node.name.toUpperCase()}
      </Typography>

      {post.categories == '' ? <Typography></Typography> : 
      <Typography>
      {post.categories.map(function(name, index){
        return <a className={classes.categoryColor} key={index} href={index} target="_blank" rel="noopener"><AttachmentIcon /> {post.categories.edges[index].node.name.toUpperCase()}</a>
      })}
      </Typography>
      }

      <Typography type='h5' className={classes.titleColor} variant='h4'>
        <SanitizedHTML html={post.title} />
      </Typography>
      <Typography type='subheading' variant='subtitle1'>
        {date}
      </Typography>

      {post.jobTitleInput == 0 ? <Typography></Typography> : 
        <Typography paragraph='true' className={`${classes.jobTitleStyle} ${classes.jobTitleStyleFirst}`} variant='overline'>
          <AssignmentIcon className={classes.iconStyle} /> {post.jobTitleInput}
        </Typography>
        }
        {post.jobLocationInput == 0 ? <Typography></Typography> : 
        <Typography paragraph='true' className={classes.jobTitleStyle} variant='overline'>
          <RoomIcon className={classes.iconStyle} /> {post.jobLocationInput}
        </Typography>
        }
        {post.jobWorkdayInput == 0 ? <Typography></Typography> : 
        <Typography paragraph='true' className={classes.jobTitleStyle} variant='overline'>
          <AccessTimeIcon className={classes.iconStyle} /> {post.jobWorkdayInput}
        </Typography>
        }

      <Typography
        type='body2'
        component='div'
        className={classes.postContent}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

        {docString == '' ? <Typography></Typography> : 
      <Typography>
      {docNameArray.map(function(name, index){
        return <a className={classes.attachmentStyle} key={index} href={docFileArray[index]} target="_blank" rel="noopener"><AttachmentIcon /> {name}</a>
      })}
      </Typography>
      }

      <Button onClick={props.history.goBack} className={classes.backBtn}>
        <BackIcon />
        Go Back
      </Button>
    </div>
  )
}

export default withRouter(
  withStyles(styles)(
    graphql(SinglePostDetail, {
      options: ({ match }) => ({ variables: { slug: match.params.slug } })
    })(PostDetail)
  )
)
