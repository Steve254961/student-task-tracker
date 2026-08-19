import { useMemo, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { initialTasks } from "./data/tasks";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch === "" ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "All" ||
        task.category.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [tasks, search, category]);

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  function toggleTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function toggleSelection(taskId) {
    setSelectedTasks((currentSelected) =>
      currentSelected.includes(taskId)
        ? currentSelected.filter((id) => id !== taskId)
        : [...currentSelected, taskId]
    );
  }

  function addTask(newTask) {
    const task = {
      ...newTask,
      id: `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,
      completed: false,
    };

    setTasks((currentTasks) => [
      task,
      ...currentTasks,
    ]);

    setShowForm(false);
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );

    setSelectedTasks((currentSelected) =>
      currentSelected.filter((id) => id !== taskId)
    );
  }

  function clearCompleted() {
    const completedIds = tasks
      .filter((task) => task.completed)
      .map((task) => task.id);

    setTasks((currentTasks) =>
      currentTasks.filter((task) => !task.completed)
    );

    setSelectedTasks((currentSelected) =>
      currentSelected.filter(
        (id) => !completedIds.includes(id)
      )
    );
  }

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Header />

        <section className="welcome-section">
          <div>
            <p className="eyebrow">STUDENT WORKSPACE</p>

            <h1>Student Task Tracker</h1>

            <p className="welcome-text">
              Organize your assignments, projects, and study activities.
            </p>
          </div>

          <button
            className="primary-button"
            type="button"
            onClick={() => setShowForm(true)}
          >
            + Add Task
          </button>
        </section>

        <section
          className="stats-grid"
          aria-label="Task statistics"
        >
          <article className="stat-card">
            <span className="stat-label">
              Total Tasks
            </span>
            <strong>{tasks.length}</strong>
          </article>

          <article className="stat-card">
            <span className="stat-label">
              Completed
            </span>
            <strong>{completedTasks}</strong>
          </article>

          <article className="stat-card">
            <span className="stat-label">
              Pending
            </span>
            <strong>{pendingTasks}</strong>
          </article>

          <article className="stat-card">
            <span className="stat-label">
              Selected
            </span>
            <strong>{selectedTasks.length}</strong>
          </article>
        </section>

        <section className="tasks-section">
          <div className="section-header">
            <div>
              <h2>My Tasks</h2>

              <p aria-live="polite">
                {filteredTasks.length} task
                {filteredTasks.length !== 1
                  ? "s"
                  : ""}{" "}
                displayed
              </p>
            </div>

            <button
              type="button"
              className="secondary-button"
              onClick={clearCompleted}
              disabled={completedTasks === 0}
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
                <option value="All">
                  All categories
                </option>

                <option value="Networking">
                  Networking
                </option>

                <option value="Programming">
                  Programming
                </option>

                <option value="Database">
                  Database
                </option>

                <option value="Design">
                  Design
                </option>
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