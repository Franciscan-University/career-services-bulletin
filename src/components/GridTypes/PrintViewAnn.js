import React from 'react'
import Grid from '@material-ui/core/Grid'
import AnnouncementRenderer from './AnnouncementRenderer'

class PrintView extends React.Component {
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
    if (!this.props.announcements && this.props.loading) return <p>Loading....</p>
    return (
      <div>
        <Grid container justify='center'>
          <Grid item xs={12}>
            {this.props.announcements &&
              this.props.announcements.edges.map(announcement => (
                <AnnouncementRenderer
                  view='print'
                  key={announcement.node.id}
                  title={announcement.node.title}
                  content={announcement.node.content}
                  categoriesList={announcement.node.categories.edges}
                />
              ))}
          </Grid>
        </Grid>
        {this.props.loading && <h2>Loading...</h2>}
      </div>
    )
  }
}

export default PrintView
