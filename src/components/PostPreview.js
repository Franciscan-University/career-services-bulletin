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
  continue: {
    textDecoration: 'none',
    color: blue[800],
    fontSize: '16px'
  },
  printVAtt: {
    width: 'auto',
    fontSize: '18px'
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

class PostPreview extends React.Component {
  state = {
    cRead: false,
    content: ''
  }
  sanitizeContent = content => {
    const regex = /(<([^>]+)>)/gi
    let newContent = content.replace(regex, '')
    if (!this.props.trim) return newContent
    if (newContent.split(' ').length > 28) {
      newContent = newContent
        .split(' ')
        .slice(0, 55)
        .join(' ')
      this.setState({
        cRead: true
      })
    }
    return newContent
  }
  componentWillMount () {
    this.setState({ sanitized: this.sanitizeContent(this.props.content) })
  }
  render () {
    const {
      classes,
      title,
      jobTitleInput,
      jobLocationInput,
      jobWorkdayInput,
      postBannerImg,
      imageURL,
      date,
      featuredImage,
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
            jobWorkdayInput={jobWorkdayInput}
            postBannerImg={postBannerImg}
            imageURL={imageURL}
            postDate={postDate}
            slug={slug}
            style={style}
            category={category}
            cRead={this.state.cRead}
            content={this.state.sanitized}
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
  jobWorkdayInput,
  slug,
  imageURL,
  postDate,
  id,
  style,
  category,
  content,
  cRead
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
        <Typography className={classes.dateColor} variant='overline'>
        {jobTitleInput == 0 ? '' : {jobTitleInput}} {jobLocationInput == 0 ? '' : ' |' + {jobLocationInput}} {jobWorkdayInput == 0 ? '' : ' |' + {jobWorkdayInput}}
        </Typography>
        <Typography component='div' variant='body2' gutterBottom>
          <div>
            <SanitizedHTML style={{ display: 'inline' }} html={content} />
            {cRead && (
              <Link className={classes.continue} to={`/post/${slug}`}>
                {' '}
                ...Continue Reading
              </Link>
            )}
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

export default withStyles(styles)(PostPreview)
