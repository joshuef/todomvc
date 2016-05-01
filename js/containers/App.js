import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions/todos'

class App extends Component {
  render() {
    const { todos, authorizations, actions } = this.props
    console.info(authorizations)
    if(authorizations.inFlight) {
      return(<div>Authorizing...</div>)
    } else {
      if(authorizations.isAuthorized) {
        return(
          <div>
            <Header addTodo={actions.addTodo} />
            <MainSection todos={todos} actions={actions} />
          </div>
        )
      } else {
        return(<div>Boo...</div>)
      }
    }
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  authorizations: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    todos: state.todos, authorizations: state.authorizations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)