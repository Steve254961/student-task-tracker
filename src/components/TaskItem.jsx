function TaskItem({
  task,
  selected,
  onToggle,
  onSelect,
  onDelete,
}) {
  return (
    <article
      className={`task-card ${task.completed ? "completed" : ""}`}
    >
      <div className="task-check">
        <input
          id={`select-${task.id}`}
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(task.id)}
          aria-label={`Select ${task.title}`}
        />
      </div>

      <div className="task-main">
        <div className="task-title-row">
          <h3>{task.title}</h3>

          <span
            className={`category category-${task.category.toLowerCase()}`}
          >
            {task.category}
          </span>
        </div>

        <p>{task.description}</p>

        <div className="task-meta">
          <span>Due: {task.dueDate}</span>

          {task.completed && (
            <span
              className="completed-label"
              role="status"
            >
              Completed
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="complete-button"
          onClick={() => onToggle(task.id)}
          aria-label={
            task.completed
              ? `Mark ${task.title} as pending`
              : `Mark ${task.title} as completed`
          }
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;