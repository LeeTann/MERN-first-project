import React, { Component } from 'react'
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'
import { getItems, deleteItem } from '../actions/itemActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component {

    componentDidMount() {
        this.props.getItems()
    }

    onDeleteClick = id => {
        this.props.deleteItem(id)
    }

    render() {
        const { items } = this.props.item // this.props.item comes from index reducer
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={300} classNames="fade">
                                <ListGroupItem>
                                  { this.props.isAuthenticated &&
                                  ( <Button 
                                      className="remove-btn"
                                      color="danger"
                                      size="sm"
                                      style={{marginRight: '1.5rem'}}
                                      onClick={this.onDeleteClick.bind(this, _id)}
                                    >&times;</Button>) 

                                  }

                                    {name}
                                </ListGroupItem>
                            </CSSTransition>         
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList)