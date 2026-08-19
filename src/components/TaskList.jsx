import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  selectedTasks,
  onToggle,
  onSelect,
  onDelete,
}) {
  if (tasks.length === 0) {
    return (
      <div
        className="empty-state"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="empty-icon" aria-hidden="true">
          ✓
        </div>

        <h3>No tasks found</h3>

        <p>
          Try changing your search or category filter.
        </p>
      </div>
    );
  }

  return (
    <div
      className="task-list"
      aria-label="Student tasks"
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          selected={selectedTasks.includes(task.id)}
          onToggle={onToggle}
          onSelect={onSelect}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;