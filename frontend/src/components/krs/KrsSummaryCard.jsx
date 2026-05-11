import StatusBadge from "../common/StatusBadge.jsx";

export default function KrsSummaryCard({ krs }) {
  return (
    <div className="summary-card">
      <div>
        <p className="summary-label">Total SKS</p>
        <h3>{krs?.totalSks || 0}</h3>
      </div>
      <div>
        <p className="summary-label">Total Class</p>
        <h3>{krs?.totalClasses || 0}</h3>
      </div>
      <div>
        <p className="summary-label">Status</p>
        <StatusBadge status={krs?.status || "draft"} />
      </div>
    </div>
  );
}
