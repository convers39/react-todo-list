import "./App.scss";
import List from "./components/List";
import Header from "./components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
	return (
		<div className="App">
			<DndProvider backend={HTML5Backend}>
				<Header />
				<List />
			</DndProvider>
		</div>
	);
}

export default App;
