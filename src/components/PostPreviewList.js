import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { blue, grey } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'
import SanitizedHTML from 'react-sanitized-html'

const styles = {
  card: {
    marginBottom: 15
  },
  titleColor: {
    color: '#21412a'
  },
  dateColor: {
    color: grey[500]
  },
  categoryColor: {
    color: '#998643'
  },
  media: {
    height: 'auto',
    width: '100%'
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  },
  printVAtt: {
    width: 'auto',
    fontSize: '18px'
  },
  jobTitleStyle: {
    color: '#000000'
  }
}

const CardImage = ({ mediaStyle, imageURL, slug }) => {
  if (!imageURL) return ''

  return (
    <Link to={`/post/${slug}`}>
      <CardMedia className={mediaStyle} component='img' image={imageURL} />
    </Link>
  )
}

class PostPreviewList extends React.Component {
  render () {
    const {
      classes,
      title,
      jobTitleInput,
      jobLocationInput,
      postBannerImg,
      imageURL,
      date,
      slug,
      style,
      category,
      view
    } = this.props
    const postDate = new Date(date).toLocaleDateString()
    return (
      <div>
        {view === 'card' ? (
          <CardView
            classes={classes}
            title={title}
            jobTitleInput={jobTitleInput}
            jobLocationInput={jobLocationInput}
            postBannerImg={postBannerImg}
            imageURL={imageURL}
            postDate={postDate}
            slug={slug}
            style={style}
            category={category}
            content={this.props.content}
          />
        ) : (
          <PlainView
            classes={classes}
            title={title}
            content={this.props.content}
          />
        )}
      </div>
    )
  }
}

const CardView = ({
  classes,
  title,
  jobTitleInput,
  jobLocationInput,
  postBannerImg,
  slug,
  imageURL,
  postDate,
  id,
  style,
  category,
  content
}) => (
  <div>
    <Card className={classes.card} style={style}>
      <CardImage mediaStyle={classes.media} imageURL={imageURL} slug={slug} />
      <CardContent>
        <Typography variant='button' className={classes.categoryColor}>
          {category.toUpperCase()}
        </Typography>
        <Typography className={classes.titleColor} variant='h6'>
          <Link className={classes.link} to={`/post/${slug}`}>
            <SanitizedHTML html={title} />
          </Link>
        </Typography>
        <Typography className={classes.dateColor} variant='overline'>
          {postDate}
        </Typography>
        {jobTitleInput == 0 ? <Typography></Typography>: null }
        <Typography paragraph='true' className={classes.jobTitleStyle} variant='overline'>:
          {jobTitleInput}
        </Typography>
        {jobLocationInput == 0 ? <Typography></Typography>: null }
        <Typography paragraph='true' className={classes.jobTitleStyle} variant='overline'>
          {jobLocationInput}
        </Typography>
        <Typography component='div' variant='body2' gutterBottom>
          <div className='list-view-single-announcement'>
            <Typography
              style={{ display: 'inline' }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </Typography>
      </CardContent>
    </Card>
  </div>
)

const PlainView = ({ classes, title, id, content }) => (
  <div style={{ fontFamily: 'serif !important' }}>
    <h1>
      <u>{title}</u>
    </h1>
    <div dangerouslySetInnerHTML={{ __html: content }} />
    <hr />
  </div>
)

export default withStyles(styles)(PostPreviewList)
