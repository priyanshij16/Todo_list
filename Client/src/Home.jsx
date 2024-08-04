// import React, { useEffect, useState } from "react";
// import Create from "./Create";
// import "./App.css";
// import axios from "axios";
// import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

// const Home = () => {
//   const [todos, setTodos] = useState([]);
//   const [editId, setEditId] = useState(null);
// const [editTask, setEditTask] = useState("");

//   useEffect(() => {
//     console.log(">>>", todos);
//     fetchTodos();
//   }, []);

//   const fetchTodos = () => {
//     axios
//       .get("http://localhost:3001/get")
//       .then((result) => {
//         console.log("Fetched Todos:", result.data);
//         setTodos(result.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleEdit = (id) => {
//     axios
//       .put(`http://localhost:3001/update/${id}`, { completed: true }) // Assuming you want to mark as completed
//       .then(() => {
//         // After updating, fetch the todos again to reflect changes
        
//         fetchTodos();
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleSaveEdit = (id) => {
//     axios
//       .put(`http://localhost:3001/update/${id}`, { task: editTask })
//       .then(() => {
//         setEditId(null);
//         fetchTodos();
//       })
//       .catch((err) => console.log(err));
//   };
  
// const handleDelete = (id) => {
//   if (window.confirm("Are you sure you want to delete this todo?")) 

//   axios
//     .delete(`http://localhost:3001/delete/${id}`) 
//     .then(() => {
//       fetchTodos();
//     })
//     .catch((err) => console.log(err));
// };
//   return (
//     <div className="home">
//       <h1> TodoS</h1>
//       <Create onAdd={fetchTodos} />
//       <br/>
//       {todos.length == 0 ? (
//         <div>
//           {" "}
//           <h2>No Todos Yet! </h2>
//         </div>
//       ) : (
//         todos.map((todo) => (
//           <div className="task">
//             <div className="checkbox" onClick={ ()=>handleEdit(todo._id)}>
//              {todo.completed ?
//              < BsFillCheckCircleFill className="icon"> </BsFillCheckCircleFill>
//              : <BsCircleFill className="icon" />
//              }
//             <p className= {todo.completed?"line_through":""}>{todo.task}</p>
//             {/* <p className="date">Created at: {new Date(todo.createdAt).toLocaleDateString()}</p> */}
//           </div>

//             <div>
//             <span className="deleteTrash"> <BsFillTrashFill className='icons' 
//             onClick={ ()=> handleDelete(todo._id)}/></span>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import Create from "./Create";
import "./App.css";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:3001/get")
      .then((result) => {
        setTodos(result.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch todos.');
        setLoading(false);
      });
  };

  const handleEdit = (id) => {
    setEditId(id);
    const todo = todos.find((todo) => todo._id === id);
    setEditTask(todo.task);
  };

  const handleSaveEdit = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`, { task: editTask })
      .then(() => {
        setEditId(null);
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleComplete = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`, { completed: true })
      .then(() => {
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      axios
        .delete(`http://localhost:3001/delete/${id}`)
        .then(() => {
          fetchTodos();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleAddTag = (id, tag) => {
    axios
      .put(`http://localhost:3001/update/${id}`, { tag })
      .then(() => {
        fetchTodos();
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home">
      <h1>TodoS</h1>
      <Create onAdd={fetchTodos} />
      <br />
      {todos.length === 0 ? (
        <div>
          <h2>No Todos Yet!</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="task">
            <div className="checkbox" onClick={() => handleComplete(todo._id)}>
              {todo.completed ? (
                <BsFillCheckCircleFill className="icon" />
              ) : (
                <BsCircleFill className="icon" />
              )}
              {editId === todo._id ? (
                <div>
                  <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                  />
                  <button onClick={() => handleSaveEdit(todo._id)}>Save</button>
                </div>
              ) : (
                <p className={todo.completed ? "line_through" : ""}>
                  {todo.task}
                </p>
              )}
              {/* <select
                value={todo.tag || ""}
                onChange={(e) => handleAddTag(todo._id, e.target.value)}
              >
                <option value="">Select Tag</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Urgent">Urgent</option>
              </select> */}
            </div>
            <div>
              <span className="deleteTrash">
                <BsFillTrashFill
                  className="icons"
                  onClick={() => handleDelete(todo._id)}
                />
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
