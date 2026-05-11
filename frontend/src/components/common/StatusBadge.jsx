const STATUS_LABEL = {
  draft: "Draft",
  submitted: "Submitted",
  approved: "Approved",
  rejected: "Rejected",
};

export default function StatusBadge({ status }) {
  const normalized = (status || "draft").toLowerCase();
  return <span className={`status-badge ${normalized}`}>{STATUS_LABEL[normalized] || normalized}</span>;
}
