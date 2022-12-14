import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import { blue, grey } from '@material-ui/core/colors'
import Divider from '@material-ui/core/Divider';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AttachmentIcon from '@material-ui/icons/Attachment';
import RoomIcon from '@material-ui/icons/Room';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
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
    color: '#998643',
    textDecoration: 'uppercase'
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
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px'
  },
  iconStyle: {
    marginRight: '2px'
  },
  divider: {
    marginTop: '2em',
    marginBottom: '1em'
  },
  attachmentStyle: {
    display: 'flex',
    marginBottom: '8px',
    width: 'fit-content'
  }
}

const CardImage = ({ mediaStyle, imageURL, slug }) => {
  if (!imageURL) return ''

  return (
    <Link to={`/announcement/${slug}`}>
      <CardMedia className={mediaStyle} component='img' image={imageURL} />
    </Link>
  )
}

class AnnouncementPreviewList extends React.Component {
  render () {

    const {
      classes,
      title,
      imageURL,
      date,
      slug,
      style,
      category,
      categoriesList,
      view,
    } = this.props
    


    var catArray = [];
    var catArrayLim = '';

    
    /*if (categoriesList.length > 3) {
      catArrayLim = 3;
    } else {
      catArrayLim = categoriesList.length;
    }
    for (var j=0; j<catArrayLim; j++) {
      if (categoriesList[j].node.name.toLowerCase() != 'full-time employment' &&
      categoriesList[j].node.name.toLowerCase() != 'part-time employment' &&
      categoriesList[j].node.name.toLowerCase() != 'internships') {
        catArray.push(categoriesList[j].node.name)
      }
    }
    var catString = catArray.join(' \u2022 ');*/

    const postDate = new Date(date).toLocaleDateString()
    return (
      <div>
        {view === 'card' ? (
          <CardView
            classes={classes}
            title={title}
            //imageURL={imageURL}
            postDate={postDate}
            slug={slug}
            style={style}
            //category={category}
            //categoriesList={categoriesList}
            content={this.props.content}
            //catString={catString}
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
  slug,
  imageURL,
  postDate,
  id,
  style,
  category,
  categoriesList,
  content
}) => (
  <div>
    <Card className={classes.card} style={style}>
      <CardImage mediaStyle={classes.media} imageURL={imageURL} slug={slug} />
      <CardContent>
        <Typography className={classes.titleColor} variant='h6'>
          <Link className={classes.link} to={`/announcement/${slug}`}>
            <SanitizedHTML html={title} />
          </Link>
        </Typography>
        <Typography className={classes.dateColor} variant='overline'>
          {postDate}
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

export default withStyles(styles)(AnnouncementPreviewList)
