import { useEffect, useMemo, useState } from "react";
import Alert from "../components/common/Alert.jsx";
import FormInput from "../components/common/FormInput.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import Modal from "../components/common/Modal.jsx";
import Table from "../components/common/Table.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";
import { approveKrs, getPendingKrs, rejectKrs } from "../services/api.js";
import { getPayload, toArray } from "../utils/apiData.js";

export default function LecturerApprovalPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pendingKrs, setPendingKrs] = useState([]);
  const [selectedKrsId, setSelectedKrsId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const isRejectModalOpen = useMemo(() => Boolean(selectedKrsId), [selectedKrsId]);

  const refreshPending = async () => {
    const response = await getPendingKrs();
    setPendingKrs(toArray(getPayload(response)));
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        await refreshPending();
      } catch (err) {
        setError(err.message || "Failed to load pending KRS");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleApprove = async (krs) => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await approveKrs(krs.id || krs.krs_id);
      await refreshPending();
      setSuccess("KRS approved.");
    } catch (err) {
      setError(err.message || "Failed to approve KRS");
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await rejectKrs(selectedKrsId, rejectionReason);
      setSelectedKrsId(null);
      setRejectionReason("");
      await refreshPending();
      setSuccess("KRS rejected.");
    } catch (err) {
      setError(err.message || "Failed to reject KRS");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState label="Loading pending approvals..." />;
  }

  const columns = [
    {
      key: "student_name",
      label: "Student",
      render: (row) => row.student_name || row.studentName || "-",
    },
    {
      key: "nim",
      label: "NIM",
      render: (row) => row.nim || row.student_nim || "-",
    },
    {
      key: "total_sks",
      label: "Total SKS",
      render: (row) => Number(row.total_sks || row.totalSks || 0),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn" disabled={saving} onClick={() => handleApprove(row)}>
            Approve
          </button>
          <button
            className="btn btn-warning"
            disabled={saving}
            onClick={() => setSelectedKrsId(row.id || row.krs_id)}
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="card">
        <h2>Lecturer KRS Approval</h2>
        <p className="eyebrow">Validasi pengajuan KRS mahasiswa sesuai kelas yang diampu.</p>
      </div>

      <Alert type="error" message={error} />
      <Alert type="success" message={success} />

      <div className="card">
        <Table columns={columns} data={pendingKrs} emptyLabel="No pending KRS." />
      </div>

      <Modal
        open={isRejectModalOpen}
        title="Reject KRS"
        onClose={() => {
          setSelectedKrsId(null);
          setRejectionReason("");
        }}
        onConfirm={handleReject}
        confirmLabel={saving ? "Rejecting..." : "Reject"}
      >
        <FormInput
          as="textarea"
          label="Rejection Reason"
          value={rejectionReason}
          onChange={(event) => setRejectionReason(event.target.value)}
          placeholder="Alasan penolakan minimal 10 karakter"
          required
        />
      </Modal>
    </section>
  );
}
