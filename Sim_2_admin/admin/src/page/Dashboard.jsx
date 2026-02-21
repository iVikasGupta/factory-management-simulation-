import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [groupStats, setGroupStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchGroupStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupStats = async () => {
    try {
      const res = await api.get("/groups/stats/summary");
      setGroupStats(res.data);
    } catch (err) {
      console.error("Failed to fetch group stats:", err);
    }
  };

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Welcome to Admin Dashboard!</h1>
      <p className="mb-4 text-muted">Factory Management Simulation - Admin Panel</p>

      {/* Stats Cards */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : stats ? (
        <div className="row">
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card bg-primary text-white shadow h-100">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">Total Users</div>
                    <div className="h5 mb-0 font-weight-bold">{stats.users?.total || 0}</div>
                    <Link to="/admin/users" className="text-white-50 small stretched-link">View All →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card bg-success text-white shadow h-100">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">Submissions</div>
                    <div className="h5 mb-0 font-weight-bold">{stats.submissions?.total || 0}</div>
                    <Link to="/admin/results" className="text-white-50 small stretched-link">View All →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card bg-info text-white shadow h-100">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">Groups</div>
                    <div className="h5 mb-0 font-weight-bold">{groupStats?.totalGroups || 0}</div>
                    <Link to="/admin/groups" className="text-white-50 small stretched-link">Manage →</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 mb-4">
            <div className="card bg-warning text-dark shadow h-100">
              <div className="card-body">
                <div className="row no-gutters align-items-center">
                  <div className="col mr-2">
                    <div className="text-xs font-weight-bold text-uppercase mb-1">Locked Groups</div>
                    <div className="h5 mb-0 font-weight-bold">{groupStats?.lockedGroups || 0}</div>
                    <small className="text-dark-50">Ready to play</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Group Stats */}
      {groupStats && (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Groups Overview</h6>
          </div>
          <div className="card-body">
            <div className="row text-center">
              <div className="col-6 col-md-4 col-lg-2 mb-3">
                <h4 className="text-primary">{groupStats.totalGroups}</h4>
                <div className="small text-muted">Total Groups</div>
              </div>
              <div className="col-6 col-md-4 col-lg-2 mb-3">
                <h4 className="text-success">{groupStats.lockedGroups}</h4>
                <div className="small text-muted">Locked</div>
              </div>
              <div className="col-6 col-md-4 col-lg-2 mb-3">
                <h4 className="text-warning">{groupStats.unlockedGroups}</h4>
                <div className="small text-muted">Unlocked</div>
              </div>
              <div className="col-6 col-md-4 col-lg-2 mb-3">
                <h4 className="text-info">{groupStats.totalPlayersInGroups}</h4>
                <div className="small text-muted">Players</div>
              </div>
              <div className="col-6 col-md-4 col-lg-2 mb-3">
                <h4 className="text-secondary">{groupStats.fullGroups}</h4>
                <div className="small text-muted">Full</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submissions by Level */}
      {stats?.submissions && (
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">Submissions by Level</h6>
          </div>
          <div className="card-body">
            <div className="row">
              {[1, 2, 3, 4, 5].map((level) => (
                <div key={level} className="col-6 col-md mb-2">
                  <div className="text-center p-3 border rounded bg-light">
                    <div className="small text-muted mb-1">Level {level}</div>
                    <h5 className="mb-0 text-primary">{stats.submissions[`level${level}`] || 0}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Quick Actions</h6>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-3 mb-2">
                  <Link to="/admin/users" className="btn btn-outline-primary w-100 py-3">
                    User Management
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3 mb-2">
                  <Link to="/admin/groups" className="btn btn-outline-info w-100 py-3">
                    Group Management
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3 mb-2">
                  <Link to="/admin/results" className="btn btn-outline-success w-100 py-3">
                    View Results
                  </Link>
                </div>
                <div className="col-12 col-sm-6 col-md-3 mb-2">
                  <button className="btn btn-outline-secondary w-100 py-3" onClick={() => { fetchStats(); fetchGroupStats(); }}>
                    Refresh Stats
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
