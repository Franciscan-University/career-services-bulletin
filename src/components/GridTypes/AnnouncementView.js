import React from 'react'
import Grid from '@material-ui/core/Grid'
import Loader from '../Loader'
import AnnouncementPreviewList from '../AnnouncementPreviewList'

class ListView extends React.Component {
  state = {
    loadingFinished: false
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handleOnScroll)
    if (this.props.loadDone) this.setState({ loadingFinished: true })
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleOnScroll)
  }

  handleOnScroll = () => {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight
    if (scrolledToBottom) {
      if (
        this.props.announcements &&
        this.props.announcements.pageInfo &&
        this.props.announcements.pageInfo.hasNextPage
      ) {
        this.props.onLoadMore()
      }
    }
  }

  render () {
    if (!this.props.announcements && this.props.loading) return <Loader />

    return (
      <>
        <Grid container justify='center'>
          <Grid item xs={12} sm={12} md={8}>
            {this.props.announcements.edges.map(announcements => (
              <AnnouncementPreviewList
                view='card'
                key={announcements.node.slug}
                slug={announcements.node.slug}
                date={announcements.node.date}
                imageURL={
                  announcements.node.featuredImage && announcements.node.featuredImage.sourceUrl
                }
                title={announcements.node.title}
                category={announcements.node.categories.edges[0].node.name}
                categoriesList={announcements.node.categories.edges}
                content={announcements.node.content}
              />
            ))}
          </Grid>
        </Grid>
        {this.props.loading && <Loader />}
      </>
    )
  }
}

export default ListView
