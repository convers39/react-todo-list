import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase/config";
import { AuthContext } from "./Auth";

const Tags = () => {
	const [tags, setTags] = useState([]);
	const { uid } = useContext(AuthContext);
	const baseUrl = `all_lists/${uid}/tags`;

	useEffect(() => {
		db.ref(baseUrl)
			.get()
			.then((tags = []) => {
				setTags(tags);
			});
	}, [baseUrl]);
	// tags = [tag1:{listName:todoId, listName:todoId }, tag2:{}]
	// Object.entries(tags[0]) => key value
	// url = `all_lists/${uid}/${listName}
	//
	return (
		<div>
			<ul>
				{tags.map((tag) => (
					<li key={tag}>{tag}</li>
				))}
			</ul>
			<button>Search</button>
		</div>
	);
};

export default Tags;
