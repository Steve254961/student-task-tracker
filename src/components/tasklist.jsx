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
      <div className="empty-state">
        <div className="empty-icon">✓</div>
        <h3>No tasks found</h3>
        <p>
          Try changing your search or category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
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