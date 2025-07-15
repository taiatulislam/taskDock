import "./App.css";
import ToDo from "../src/assets/to-do-list.png";
import { useState } from "react"

function App() {

  const [inputField, setInputField] = useState("");
  const [allToDos, setAllToDos] = useState([]);

  const handleOnChange = (e) => {
    setInputField(e.target.value)
  }

  const handleAddToDo = () => {
    setAllToDos(prev => [...prev, inputField])
    setInputField("")
  }

  console.log("allToDos", allToDos)

  return (
    <div className="box">
      <div className="box-background">
        <div
          style={{
            ...displayFlex,
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              height: "600px",
              width: "500px",
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "40px",
            }}
          >
            <div style={{ ...displayFlex, gap: 2 }}>
              <h2>To-Do List</h2>
              <img src={ToDo} alt="To-Do" style={{ width: "30px" }} />
            </div>
            <div style={{ marginTop: "15px", position: "relative" }}>
              <input
                type="text"
                className="custom-input"
                placeholder="Add Your Text"
                value={inputField}
                onChange={handleOnChange}
              />
              <button className="custom-button" onClick={handleAddToDo}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const displayFlex = {
  display: "flex",
  alignItems: "center",
};

export default App;
