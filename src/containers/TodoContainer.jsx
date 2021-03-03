import { connect } from 'react-redux'
import { Todo } from '../components/Todo'
import { addTodo, deleteTodo } from '../actions/todo-action'
const mapStateToProps = (state, ownProps) => {
  return {
    todo: state.todos[ownProps.id]
  }
}

const mapDispatchToProps = { addTodo, deleteTodo }

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
