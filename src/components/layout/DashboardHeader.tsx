import React from "react";
import Link from "next/link";

export default function DashboardHeader() {
  return (
    <div className="dashboard-header">
      <h1 className="dashboard-title">Dashboard</h1>
      <Link href="/contact" className="btn-primary" id="contact-us-btn" style={{ textDecoration: "none" }}>
        Contact Us
      </Link>
    </div>
  );
}
