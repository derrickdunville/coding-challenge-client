import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { NavLink } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import Button from '@material-ui/core/Button'
import { deleteLink, putLink, toggleEditOpen } from '../actions/linkActions'
import EditDialog from '../components/EditDialog.jsx'


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)
}

const rows = [
  { id: 'title', numeric: false, disablePadding: false, label: 'Link Title', sortable: true },
  { id: 'clicks', numeric: true, disablePadding: false, label: 'Clicks', sortable: true },
  { id: 'edit', numeric: true, disablePadding: false, label: 'Edit', sortable: false },
  { id: 'delete', numeric: true, disablePadding: false, label: 'Delete', sortable: false }
]

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { order, orderBy } = this.props
    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                {row.sortable ? (
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                ):(
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                  >
                    {row.label}
                  </TableSortLabel>
                )}
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
}

const styles = theme => ({
  root: {
    maxWidth: '600px',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    maxWidth: "600px"
  },
  tableWrapper: {
    overflowX: 'auto',
  },
})

class EnhancedTable extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      order: 'asc',
      orderBy: 'title',
      selectedLink: null
    }
  }

  handleOpenEdit = (event) => {
    this.setState({selectedLink: event.currentTarget.title}, () => {
      this.props.toggleEditOpen()
    })
  }

  handleClose = () => {
    this.setState({ selectedLink: null })
    this.props.toggleEditOpen()
  }

  handleEditLink = (newTitle) => {
    this.props.putLink(this.state.selectedLink, newTitle)
  }

  handleDeleteLink = (event, property) => {
    this.props.deleteLink(event.currentTarget.title)
  }

  handleRequestSort = (event, property) => {
    const orderBy = property
    let order = 'desc'
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }
    this.setState({ order, orderBy })
  }

  render() {
    const { classes, data, columns } = this.props
    const { order, orderBy } = this.state
    return (
      <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={this.handleRequestSort}
              />
              <TableBody>
                {stableSort(data, getSorting(order, orderBy))
                  .map(n => {
                    return (
                      <TableRow
                        tabIndex={-1}
                        key={n._id}
                      >
                        <TableCell component="th" scope="row" padding="default">
                          <NavLink
                            to={`/${n.title}`}
                            key={n._id}
                            >
                            {n.title}
                          </NavLink>
                        </TableCell>
                        <TableCell align="right">{n.clicks}</TableCell>
                        <TableCell align="right">
                          <Button color="default" id={n._id} title={n.title} onClick={this.handleOpenEdit}>
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button color="secondary" id={n.id} title={n.title} onClick={this.handleDeleteLink}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </div>
        </Paper>
        {this.state.selectedLink && (
          <EditDialog
            open={this.props.editOpen}
            handleSave={this.handleEditLink}
            handleClose={this.handleClose}
            link={this.state.selectedLink}
            />
        )}
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    editOpen: state.links.editOpen
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array.isRequired
}

export default connect(mapStateToProps, { deleteLink, putLink, toggleEditOpen })(withStyles(styles)(EnhancedTable))
