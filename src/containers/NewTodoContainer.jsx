import { connect } from 'react-redux'
import NewTodo from '../components/NewTodo'
import { addTodo } from '../actions/todo-action'

const mapDispatchToProps = { addTodo }

export default connect(null, mapDispatchToProps)(NewTodo)
