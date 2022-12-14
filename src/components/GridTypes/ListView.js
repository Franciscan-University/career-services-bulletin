import React from 'react'
import Grid from '@material-ui/core/Grid'
import Loader from '../Loader'
import PostPreviewList from '../PostPreviewList'

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
        this.props.posts &&
        this.props.posts.pageInfo &&
        this.props.posts.pageInfo.hasNextPage
      ) {
        this.props.onLoadMore()
      }
    }
  }

  render () {
    if (!this.props.posts && this.props.loading) return <Loader />

    return (
      <>
        <Grid container justify='center'>
          <Grid item xs={12} sm={12} md={8}>
            {this.props.posts.edges.map(post => (
              <PostPreviewList
                view='card'
                key={post.node.slug}
                slug={post.node.slug}
                date={post.node.date}
                imageURL={
                  post.node.featuredImage && post.node.featuredImage.sourceUrl
                }
                title={post.node.title}
                jobTitleInput={post.node.jobTitleInput}
                jobLocationInput={post.node.jobLocationInput}
                jobWorkdayInput={post.node.jobWorkdayInput}
                postBannerImg={post.node.postBannerImg}
                category={post.node.categories.edges[0].node.name}
                categoriesList={post.node.categories.edges}
                content={post.node.content}
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
