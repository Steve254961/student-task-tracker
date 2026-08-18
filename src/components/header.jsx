function Header() {
  return (
    <header className="topbar">
      <div>
        <span className="breadcrumb">Dashboard / Tasks</span>
      </div>

      <div className="profile">
        <div className="avatar">SK</div>

        <div className="profile-info">
          <strong>Student</strong>
          <span>Active learner</span>
        </div>
      </div>
    </header>
  );
}

export default Header;