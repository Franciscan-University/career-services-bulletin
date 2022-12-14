import React, { Component } from 'react'
import { getAllCategories } from '../../graphql/queries/categories'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ListSubheader from '@material-ui/core/ListSubheader'
import ClockIcon from '@material-ui/icons/AccessTime'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { Link } from 'react-router-dom'
import AlarmClock from '@material-ui/icons/Alarm'
import { graphql } from 'react-apollo'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import fuslogo from './img/fuslogo.png'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'


const displayCategories = props => {
  const { data, classes } = props
  if (data.loading) return

  return (
    <div style={{height: 'auto', paddingBottom: '3em'}}>
      {/*<Link to={`/all`} className={classes.link}>
        <ListItem button>
          <ListItemText secondary={`All Job Postings`} />
        </ListItem>
  </Link>*/}
      {data &&
        data.categories &&
        data.categories.edges &&
        data.categories.edges.map(category => (
          <Link
            key={category.node.id}
            to={`/category/${category.node.slug}`}
            className={classes.link}
          >
          {category.node.name == 'Uncategorized' ? null :
            <ListItem button>
              <ListItemText secondary={category.node.name} />
            </ListItem>
          }
          </Link>
        ))}
    </div>
  )
}

class SideComponent extends Component {
  state = {
    month: '',
    year: '',
    formStyles: {
      display: 'none'
    }
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value })
  }

  render () {
    const classes = this.props.classes
    const years = () => {
      let yearsArray = []
      for (let i = new Date().getFullYear(); i >= 2016; i--) yearsArray.push(i)
      return yearsArray
    }
    const form = (
      <form
        style={this.state.formStyles}
        onSubmit={e => {
          e.preventDefault()
          this.props.handleFilterDate(this.state.month, this.state.year)
        }}
      >
        <ListItem>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='month'>Month</InputLabel>
            <Select
              fullWidth
              value={this.state.month}
              onChange={this.handleChange('month')}
              input={<Input id='month' />}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='year'>Year</InputLabel>
            <Select
              fullWidth
              value={this.state.year}
              onChange={this.handleChange('year')}
              input={<Input id='year' />}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {years().map(year => (
                <MenuItem value={year} key={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <Button variant='outlined' type='submit'>
            SUBMIT
          </Button>
        </ListItem>
      </form>
    )

    var getBackdrop = document.querySelector('.MuiBackdrop-root');
    if (getBackdrop != null) {
      getBackdrop.addEventListener("click", this.props.handleDrawerClose);
    } 

    const drawer = (
      <div className={classes.drawerInner}>
        <div className={classes.drawerHeader}>
          <ListItem>
            <Link to='/all'>
              <img className={classes.image} alt='logo' src={fuslogo} />
            </Link>
          </ListItem>
          <IconButton
            className={classes.navIconHide}
            onClick={this.props.handleDrawerClose}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Link to='/' className={classes.link}>
          <ListItem button>
            <ListItemText secondary='All Job Postings' />
          </ListItem>
        </Link>
        <Divider />
        {/*
        <Link to='/category/time-sensitive' className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <AlarmClock />
            </ListItemIcon>
            <ListItemText secondary='Take Action' />
          </ListItem>
        </Link>
        <Divider />
    */}
        <ListSubheader style={{backgroundColor: 'white'}}>Categories</ListSubheader>
        {displayCategories(this.props)}
        {/*
        <ListItem button onClick={this.toggleForm}>
          <ListItemIcon>
            <ClockIcon />
          </ListItemIcon>
          <ListItemText secondary='Filter By Date' />
        </ListItem>
        {form}
        <Divider />
  
        <ListItem
          button
          className={classes.btn}
          onClick={this.props.toggleDrawer}
        >
          <ListItemText secondary={'Submit Announcement'} />
        </ListItem>
        <Divider />
        */}
      </div>
    )
    return (
      <div style={this.props.style}>
       
        <Hidden mdUp implementation='css'>
        
          <Drawer
            variant='temporary'
            open={this.props.open}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.props.handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            
          >
            {drawer}
          </Drawer>
          
        </Hidden>
        
        <Hidden smDown implementation='css'>
        {/*<ClickAwayListener onClickAway={this.props.handleDrawerToggle}>*/}
          <Drawer
            variant='persistent'
            open
            classes={{
              paper: classes.drawerPaper
            }}
          >
            {drawer}
          </Drawer>
          {/*</ClickAwayListener>*/}
        </Hidden>
      </div>
    )
  }
  toggleForm = () => [
    this.setState({
      formStyles: {
        display: this.state.formStyles.display === 'block' ? 'none' : 'block'
      }
    })
  ]
}

export default graphql(getAllCategories)(SideComponent)
