import React from 'react'
import Grid from '@material-ui/core/Grid'
import PostPreview from '../PostPreview'
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

    console.log(this.props.announcements + 'hi');
    console.log(this.props.posts);
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
        this.props.posts &&
        this.props.posts.pageInfo &&
        this.props.posts.pageInfo.hasNextPage
      ) {
        this.props.onLoadMore()
      }
    }
  }

  render () {
    if (!this.props.posts && this.props.loading) return <p>Loading....</p>
    return (
      <div>
        <Grid container justify='center'>
          <Grid item xs={12}>
            {this.props.posts &&
              this.props.posts.edges.map(post => (
                <PostPreview
                  view='print'
                  key={post.node.id}
                  title={post.node.title}
                  content={post.node.content}
                  categoriesList={post.node.categories.edges}
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
