import React from 'react'
import Masonry from 'react-masonry-component'
import Loader from '../Loader'
import '../../styles/grid.css'
import AnnouncementPreviewList from '../AnnouncementPreviewList'

class GridView extends React.Component {
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
      <div className='row'>
        <div className='container-fluid'>
          <Masonry>
            {this.props.announcements.edges.map(announcement => (
              <div className='col s12 m12 l6 xl4' key={announcement.node.slug}>
                <AnnouncementPreviewList
                  view='card'
                  date={announcement.node.date}
                  imageURL={
                    announcement.node.featuredImage && announcement.node.featuredImage.sourceUrl
                  }
                  slug={announcement.node.slug}
                  title={announcement.node.title}
                  content={announcement.node.excerpt}
                  trim
                />
              </div>
            ))}
          </Masonry>
        </div>
        {this.props.loading && <Loader />}
      </div>
    )
  }
}

export default GridView
