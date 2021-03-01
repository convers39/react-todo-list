import React, { useState, useEffect, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, ButtonGroup, TextField } from "@material-ui/core";
import { db } from "../firebase/config";
import { AuthContext } from "./Auth";

const Tags = ({ filterTag }) => {
	const { uid } = useContext(AuthContext);
	const [tagList, setTagList] = useState([]);

	useEffect(() => {
		console.log("in tags", tagList);
		filterTag(tagList);
	}, [tagList.length]);

	const pushToTagList = (e) => {
		let tag = e.target.value;
		if (e.key === "Enter" && tag) {
			e.target.value = "";
			setTagList([...tagList, tag]);
			// filterTag(tagList);
		}
	};

	const removeFromTagList = (tag) => {
		const copy = [...tagList].filter((item) => item !== tag);
		setTagList(copy);
	};

	const resetFilter = () => {
		setTagList([]);
	};
	// const baseUrl = `all_lists/${uid}/tags`;

	// useEffect(() => {
	// 	db.ref(baseUrl)
	// 		.get()
	// 		.then((tags = []) => {
	// 			console.log("tags", tags.val());
	// 			setTags(Object.keys(tags.val()));
	// 		});
	// }, [baseUrl]);
	// tags = [tag1:{listName:todoId, listName:todoId }, tag2:{}]
	// Object.entries(tags[0]) => key value
	// url = `all_lists/${uid}/${listName}
	//

	const style = {
		backgroundColor: "#eee",
		padding: ".8em",
		margin: ".5em auto",
	};
	return (
		<div style={style}>
			<TextField
				onKeyDown={pushToTagList}
				id="standard-full-width"
				label="Tag Filter"
				style={{ margin: ".2em auto" }}
				placeholder="Enter tag name and press enter"
				// helperText="Full width!"
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<div style={{ display: "flex", alignItems: "center" }}>
				<Button
					variant="contained"
					onClick={resetFilter}
					style={{ marginRight: ".5em" }}
				>
					Reset
				</Button>
				{tagList.length ? (
					tagList.map((tag) => (
						<Button
							color="primary"
							onClick={() => removeFromTagList(tag)}
							key={tag}
							style={{ margin: "0 .5em" }}
						>
							{tag}
						</Button>
					))
				) : (
					<p>No tags</p>
				)}
			</div>
		</div>
	);
};

export default Tags;
