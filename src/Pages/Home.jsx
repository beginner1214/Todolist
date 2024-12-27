import React, { useState, useEffect } from "react";
import { useAuth } from "../Authcontext/Context";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5005/api";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchTodos();
  }, [user, navigate]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch todos");
      setLoading(false);
    }
  };

  const handleAddTodo = async () => {
    if (inputValue.trim()) {
      try {
        const response = await fetch(`${API_BASE_URL}/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ text: inputValue }),
        });
        const data = await response.json();
        setTodos([data, ...todos]);
        setInputValue("");
      } catch (err) {
        setError("Failed to add todo");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditValue(text);
  };

  const handleEdit = async (id) => {
    if (editValue.trim()) {
      try {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ text: editValue }),
        });
        const data = await response.json();
        setTodos(todos.map((todo) => (todo._id === id ? data : todo)));
        setEditingId(null);
        setEditValue("");
      } catch (err) {
        setError("Failed to update todo");
      }
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="bg-[#9AECDB] flex-1 flex-col min-h-screen">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}></span>
        </div>
      )}

      <header className="h-24 w-full border-2 border-black bg-purple-500 flex items-center justify-center">
        <h1 className="text-5xl text-blue-800 font-bold">Todo List!!</h1>
      </header>

      <section className="h-24 w-full border-2 border-black bg-purple-500 flex items-center px-10">
        <input
          type="text"
          placeholder="Enter your Todos..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleAddTodo()}
          className="flex-grow h-10 border-2 border-gray-400 rounded-md px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTodo}
          className="ml-5 h-10 w-10 bg-cyan-200 flex items-center justify-center text-3xl font-bold rounded-md hover:bg-cyan-300 transition"
        >
          +
        </button>
      </section>

      <main className="flex-grow p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {todos.map((todo) => (
            <div
              key={todo._id}
              className="border-2 border-black w-full h-48 bg-white rounded-lg shadow-md p-4 flex flex-col justify-between overflow-auto break-words"
            >
              {editingId === todo._id ? (
                <div className="flex flex-col h-full">
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-grow border-2 border-gray-300 rounded-md p-2 mb-2"
                  />
                  <button
                    onClick={() => handleEdit(todo._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-lg flex-grow">{todo.text}</p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => startEditing(todo._id, todo.text)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;