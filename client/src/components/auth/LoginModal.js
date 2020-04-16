import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import { login } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    }

    componentDidUpdate(prevProps) {
      const { error, isAuthenticated } = this.props
      // Check if anything has change
      if(error !== prevProps.error) {
        // Check for register error
        if(error.id === 'LOGIN_FAIL') {
          this.setState({ msg: error.msg.msg })
        } else {
          this.setState({ msg: null })
        }
      }

      // If modal is open and if authenticated, close modal
      if(this.state.modal) {
        if(isAuthenticated) {
          this.toggle()
        }
      }
    }

    toggle = () => {
      // Clear errors
      this.props.clearErrors()
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()

        const { email, password } = this.state

        const user = {
          email,
          password
        }

        this.props.login(user)
    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                  Login
                </NavLink>

                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                      { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>

                                <Label for="email">Email</Label>
                                <Input 
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                    className="mb-3"
                                />

                                <Label for="password">Password</Label>
                                <Input 
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                    className="mb-3"
                                />
                                <Button color="dark"style={{marginTop: '2rem'}} display="block">
                                  Login
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)