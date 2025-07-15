import "./App.css";
import ToDo from "../src/assets/to-do-list.png";
import { useState, useEffect } from "react";

function App() {
  const [inputField, setInputField] = useState("");
  const [allToDos, setAllToDos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("taskdock-todos");
    if (saved) setAllToDos(JSON.parse(saved));
  }, []);

  const saveToLocalStorage = (todos) => {
    setAllToDos(todos);
    localStorage.setItem("taskdock-todos", JSON.stringify(todos));
  };

  const handleOnChange = (e) => {
    setInputField(e.target.value);
  };

  const handleAddToDo = (e) => {
    e.preventDefault();

    if (inputField.trim() === "") return;

    const newToDo = { text: inputField, completed: false };
    saveToLocalStorage([...allToDos, newToDo]);

    setInputField("");
  };

  const handleToggleComplete = (index) => {
    const updated = [...allToDos];
    updated[index].completed = !updated[index].completed;
    saveToLocalStorage(updated);
  };

  const handleRemoveToDo = (index) => {
    const updated = allToDos.filter((todo, i) => i !== index);
    saveToLocalStorage(updated);
  };

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
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Header */}
              <div style={{ ...displayFlex, gap: 2 }}>
                <h2>To-Do List</h2>
                <img src={ToDo} alt="To-Do" style={{ width: "30px" }} />
              </div>

              {/* Add To-Do */}
              <form
                onSubmit={handleAddToDo}
                style={{ marginTop: "15px", position: "relative" }}
              >
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Add Your Text"
                  value={inputField}
                  onChange={handleOnChange}
                />
                <button className="custom-button" type="submit">
                  Add
                </button>
              </form>

              {/* Show To-Do */}
              <div
                className="thin-scroll"
                style={{ flex: 1, marginTop: "15px", overflowY: "auto" }}
              >
                {allToDos?.length === 0 ? (
                  <div
                    style={{
                      height: "100%",
                      ...displayFlex,
                      justifyContent: "center",
                    }}
                  >
                    <h3>No To-Do List.</h3>
                  </div>
                ) : (
                  allToDos.map((todo, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 0",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <div
                        onClick={() => handleToggleComplete(index)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: "2px solid #555",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {/* Inner Circle */}
                          {todo.completed && (
                            <div
                              style={{
                                width: "12px",
                                height: "12px",
                                borderRadius: "50%",
                                backgroundColor: "#317fdeff",
                              }}
                            ></div>
                          )}
                        </div>

                        <span
                          style={{
                            textDecoration: todo.completed
                              ? "line-through"
                              : "none",
                            color: todo.completed ? "#aaa" : "#000",
                          }}
                        >
                          {todo?.text}
                        </span>
                      </div>

                      {/* delete */}
                      <button
                        onClick={() => handleRemoveToDo(index)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "red",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
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
