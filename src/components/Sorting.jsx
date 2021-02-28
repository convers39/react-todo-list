import React from "react";
import Button from "@material-ui/core/Button";

const Sorting = ({ sort, listName }) => {
	const style = {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		marginBottom: "10px",
	};

	return (
		<div style={style}>
			<div>Sort:</div>
			<div>
				<Button
					variant="contained"
					color="primary"
					onClick={() => sort("ASC", listName)}
				>
					By Created
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={() => sort("DEC", listName)}
				>
					by latest
				</Button>
			</div>
		</div>
	);
};

export default Sorting;
