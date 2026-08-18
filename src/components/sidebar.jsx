function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">ST</div>

        <div>
          <strong>StudyTrack</strong>
          <span>Student Workspace</span>
        </div>
      </div>

      <nav aria-label="Main navigation">
        <a href="#dashboard" className="nav-item active">
          <span>⌂</span>
          Dashboard
        </a>

        <a href="#tasks" className="nav-item">
          <span>✓</span>
          My Tasks
        </a>

        <a href="#calendar" className="nav-item">
          <span>▣</span>
          Calendar
        </a>

        <a href="#settings" className="nav-item">
          <span>⚙</span>
          Settings
        </a>
      </nav>

      <div className="sidebar-footer">
        <span className="status-dot"></span>
        <span>Workspace active</span>
      </div>
    </aside>
  );
}

export default Sidebar;