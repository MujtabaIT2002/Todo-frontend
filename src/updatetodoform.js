import React, { useState, useEffect } from "react";

function UpdateTodoForm({ todo, onUpdate }) {
  const [updatedTodo, setUpdatedTodo] = useState({
    title: "",
    description: "",
    due_date: "",
    completed: false
  });

  useEffect(() => {
    setUpdatedTodo({
      title: todo.title,
      description: todo.description,
      due_date: todo.due_date,
      completed: todo.completed
    });
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo({
      ...updatedTodo,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedTodo);
  };

  return (
    <form className="update-todo-form" onSubmit={handleSubmit}>
      <input
        className="update-todo-input"
        type="text"
        name="title"
        value={updatedTodo.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        className="update-todo-textarea"
        name="description"
        value={updatedTodo.description}
        onChange={handleChange}
        placeholder="Description"
      ></textarea>
      <input
        className="update-todo-input"
        type="date"
        name="due_date"
        value={updatedTodo.due_date}
        onChange={handleChange}
      />
      <label className="update-todo-label">
        Completed:
        <input
          className="update-todo-checkbox"
          type="checkbox"
          name="completed"
          checked={updatedTodo.completed}
          onChange={(e) =>
            setUpdatedTodo({
              ...updatedTodo,
              completed: e.target.checked
            })
          }
        />
      </label>
      <button className="update-todo-button" type="submit">Update</button>
    </form>
  );
}

export default UpdateTodoForm;
