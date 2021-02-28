import React from "react";
import { Typography, Button, ButtonGroup } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";

const Sorting = ({ sort, listName }) => {
	const style = {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		margin: "0.5em 0",
	};

	return (
		<div style={style}>
			{/* <Typography variant="h5" align="center">
				{listName}
			</Typography> */}
			<SortIcon />
			<ButtonGroup variant="contained" color="primary">
				<Button onClick={() => sort("ASC", listName)}>
					by created
				</Button>
				<Button onClick={() => sort("DEC", listName)}>by latest</Button>
			</ButtonGroup>
		</div>
	);
};

export default Sorting;
