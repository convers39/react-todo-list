import { connect } from "react-redux";
import Lists from "../components/ListBoard";

const mapStateToProps = (state) => {
	return {
		lists: state.lists.ids,
	};
};

export default connect(mapStateToProps)(Lists);
