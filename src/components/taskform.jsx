import { useState } from "react";

function TaskForm({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Programming");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !dueDate) {
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      category,
      dueDate,
    });
  }

  return (
    <div className="modal-backdrop">
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-task-title"
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">NEW TASK</p>
            <h2 id="add-task-title">Add a task</h2>
          </div>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close add task form"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="task-title">Task title</label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Complete React assignment"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="task-description">
              Description
            </label>

            <textarea
              id="task-description"
              value={description}
              onChange={(event) =>
                setDescription(event.target.value)
              }
              placeholder="Describe what needs to be completed..."
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="task-category">Category</label>

              <select
                id="task-category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
              >
                <option value="Networking">Networking</option>
                <option value="Programming">Programming</option>
                <option value="Database">Database</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="task-date">Due date</label>

              <input
                id="task-date"
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              Add Task
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TaskForm;