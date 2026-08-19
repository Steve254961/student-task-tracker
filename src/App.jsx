import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { initialTasks } from "./data/tasks";
import "./App.css";

const CATEGORY_OPTIONS = [
  "All",
  "Networking",
  "Programming",
  "Database",
  "Design",
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch === "" ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "All" || task.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [tasks, normalizedSearch, category]);

  const statistics = useMemo(() => {
    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
      selected: selectedTasks.length,
    };
  }, [tasks, selectedTasks]);

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }

  function toggleSelection(taskId) {
    setSelectedTasks((currentSelected) => {
      if (currentSelected.includes(taskId)) {
        return currentSelected.filter(
          (id) => id !== taskId
        );
      }

      return [...currentSelected, taskId];
    });
  }

  function addTask(newTask) {
    const task = {
      ...newTask,
      id: Date.now(),
      completed: false,
    };

    setTasks((currentTasks) => [task, ...currentTasks]);
    setShowForm(false);
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== taskId
      )
    );

    setSelectedTasks((currentSelected) =>
      currentSelected.filter(
        (id) => id !== taskId
      )
    );
  }

  function clearCompleted() {
    const completedIds = new Set(
      tasks
        .filter((task) => task.completed)
        .map((task) => task.id)
    );

    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => !completedIds.has(task.id)
      )
    );

    setSelectedTasks((currentSelected) =>
      currentSelected.filter(
        (id) => !completedIds.has(id)
      )
    );
  }

  const taskCountMessage =
    `${filteredTasks.length} task` +
    `${filteredTasks.length !== 1 ? "s" : ""} displayed`;

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Header />

        <section
          className="welcome-section"
          aria-labelledby="dashboard-title"
        >
          <div>
            <p className="eyebrow">STUDENT WORKSPACE</p>

            <h1 id="dashboard-title">
              Student Task Tracker
            </h1>

            <p className="welcome-text">
              Organize your assignments, projects, and study
              activities.
            </p>
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={() => setShowForm(true)}
            aria-haspopup="dialog"
            aria-expanded={showForm}
          >
            + Add Task
          </button>
        </section>

        <section
          className="stats-grid"
          aria-labelledby="task-statistics-heading"
        >
          <h2
            id="task-statistics-heading"
            className="sr-only"
          >
            Task statistics
          </h2>

          <article
            className="stat-card"
            aria-label={`Total tasks: ${statistics.total}`}
          >
            <span className="stat-label">
              Total Tasks
            </span>
            <strong>{statistics.total}</strong>
          </article>

          <article
            className="stat-card"
            aria-label={`Completed tasks: ${statistics.completed}`}
          >
            <span className="stat-label">
              Completed
            </span>
            <strong>{statistics.completed}</strong>
          </article>

          <article
            className="stat-card"
            aria-label={`Pending tasks: ${statistics.pending}`}
          >
            <span className="stat-label">
              Pending
            </span>
            <strong>{statistics.pending}</strong>
          </article>

          <article
            className="stat-card"
            aria-label={`Selected tasks: ${statistics.selected}`}
          >
            <span className="stat-label">
              Selected
            </span>
            <strong>{statistics.selected}</strong>
          </article>
        </section>

        <section
          className="tasks-section"
          aria-labelledby="task-list-heading"
        >
          <div className="section-header">
            <div>
              <h2 id="task-list-heading">
                My Tasks
              </h2>

              <p
                className="task-count"
                aria-live="polite"
                aria-atomic="true"
              >
                {taskCountMessage}
              </p>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={clearCompleted}
              disabled={statistics.completed === 0}
              aria-label={
                statistics.completed === 0
                  ? "No completed tasks to clear"
                  : `Clear ${statistics.completed} completed tasks`
              }
            >
              Clear completed
            </button>
          </div>

          <div className="filters">
            <label className="search-wrapper">
              <span className="sr-only">
                Search tasks
              </span>

              <input
                type="search"
                placeholder="Search tasks..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                aria-label="Search tasks"
                autoComplete="off"
              />
            </label>

            <label>
              <span className="sr-only">
                Filter by category
              </span>

              <select
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                aria-label="Filter tasks by category"
              >
                {CATEGORY_OPTIONS.map((option) => (
                  <option
                    key={option}
                    value={option}
                  >
                    {option === "All"
                      ? "All categories"
                      : option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <TaskList
            tasks={filteredTasks}
            selectedTasks={selectedTasks}
            onToggle={toggleTask}
            onSelect={toggleSelection}
            onDelete={deleteTask}
          />
        </section>
      </main>

      {showForm && (
        <TaskForm
          onAdd={addTask}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}

export default App;