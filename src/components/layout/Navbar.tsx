"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User as UserIcon, LogOut, Plus, Trash2, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { user, notifications, login, logout, addNotification, removeNotification, clearNotifications } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  // Form states for login/signup
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Notification input
  const [newNotifText, setNewNotifText] = useState("");

  // Calculate initials
  const getInitials = () => {
    if (!user) return "??";
    const first = user.firstName ? user.firstName[0].toUpperCase() : "";
    const last = user.lastName ? user.lastName[0].toUpperCase() : "";
    return `${first}${last}` || "US";
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) return;
    login({ firstName, lastName, email });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setAuthOpen(false);
  };

  const handleAddSampleNotif = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNotifText.trim()) return;
    addNotification(newNotifText);
    setNewNotifText("");
  };

  // Close dropdowns on outside click
  const bellRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setBellOpen(false);
      }
      if (authRef.current && !authRef.current.contains(event.target as Node)) {
        setAuthOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* Left: Logo + Desktop menu */}
      <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
        <Link href="/" className="navbar__logo" style={{ textDecoration: "none" }}>
          AlgoTrade
        </Link>

        <div className="navbar__menu">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`navbar__link${pathname === href ? " navbar__link--active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Right: Actions */}
      <div className="navbar__actions">
        {/* Notifications Bell Dropdown */}
        <div style={{ position: "relative" }} ref={bellRef}>
          <button
            className="navbar__bell"
            onClick={() => {
              setBellOpen(!bellOpen);
              setAuthOpen(false);
            }}
            aria-label="Notifications"
            id="navbar-bell-btn"
          >
            <Bell size={20} strokeWidth={1.5} />
            {notifications.length > 0 && <span className="navbar__bell-dot" />}
          </button>

          {bellOpen && (
            <div className="nav-dropdown bell-dropdown" id="bell-dropdown-menu">
              <div className="dropdown-header">
                <span className="dropdown-title">Notifications ({notifications.length})</span>
                {notifications.length > 0 && (
                  <button onClick={clearNotifications} className="btn-text-clear" id="clear-all-notifs">
                    Clear All
                  </button>
                )}
              </div>

              <div className="dropdown-body">
                {notifications.length === 0 ? (
                  <div className="dropdown-empty">No new notifications</div>
                ) : (
                  <div className="notification-list">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="notification-item">
                        <div className="notif-content">
                          <p className="notif-msg">{notif.message}</p>
                          <span className="notif-time">{notif.timestamp}</span>
                        </div>
                        <button
                          onClick={() => removeNotification(notif.id)}
                          className="btn-notif-delete"
                          aria-label="Delete notification"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add notification form */}
              <form onSubmit={handleAddSampleNotif} className="notif-add-form">
                <input
                  type="text"
                  placeholder="Add sample notification..."
                  value={newNotifText}
                  onChange={(e) => setNewNotifText(e.target.value)}
                  className="notif-input"
                  required
                />
                <button type="submit" className="btn-add-notif" id="add-notif-btn">
                  <Plus size={16} />
                </button>
              </form>
            </div>
          )}
        </div>

        {/* User Profile Auth Dropdown */}
        <div style={{ position: "relative" }} ref={authRef}>
          <div
            className="navbar__avatar"
            onClick={() => {
              setAuthOpen(!authOpen);
              setBellOpen(false);
            }}
            id="navbar-avatar"
          >
            {getInitials()}
          </div>

          {authOpen && (
            <div className="nav-dropdown auth-dropdown" id="auth-dropdown-menu">
              {user ? (
                <div className="auth-profile-view">
                  <div className="profile-hero">
                    <div className="profile-avatar-large">{getInitials()}</div>
                    <h4 className="profile-name">{user.firstName} {user.lastName}</h4>
                    <p className="profile-email">{user.email}</p>
                  </div>
                  <div className="dropdown-divider" />
                  <button onClick={logout} className="btn-logout" id="logout-btn">
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="auth-login-form">
                  <span className="form-title">Create Account / Sign In</span>
                  <div className="form-row">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="dropdown-input"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="dropdown-input"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="dropdown-input"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="dropdown-input"
                    required
                  />
                  <button type="submit" className="btn-primary auth-submit-btn" id="login-submit-btn">
                    Sign In
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          id="navbar-hamburger-btn"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: "64px", left: 0, right: 0,
          background: "white", borderBottom: "1px solid var(--border)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          display: "flex", flexDirection: "column",
          padding: "12px 24px", gap: "16px", zIndex: 100,
        }}>
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`navbar__link${pathname === href ? " navbar__link--active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
