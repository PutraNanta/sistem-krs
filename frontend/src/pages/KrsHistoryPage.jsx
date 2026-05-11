import { useEffect, useState } from "react";
import Alert from "../components/common/Alert.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import StatusBadge from "../components/common/StatusBadge.jsx";
import Table from "../components/common/Table.jsx";
import { getKrsHistory } from "../services/api.js";
import { getPayload, toArray } from "../utils/apiData.js";

export default function KrsHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getKrsHistory();
        setHistory(toArray(getPayload(response)));
      } catch (err) {
        setError(err.message || "Failed to load KRS history");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <LoadingState label="Loading KRS history..." />;
  }

  const columns = [
    {
      key: "academic_year",
      label: "Academic Year",
      render: (row) => row.academic_year || row.academicYear || "-",
    },
    {
      key: "semester",
      label: "Semester",
      render: (row) => row.semester || "-",
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
      key: "rejection_reason",
      label: "Rejection Reason",
      render: (row) => row.rejection_reason || "-",
    },
  ];

  return (
    <section>
      <div className="card">
        <h2>KRS History</h2>
        <p className="eyebrow">Riwayat pengajuan KRS dari semester sebelumnya.</p>
      </div>
      <Alert type="error" message={error} />
      <div className="card">
        <Table columns={columns} data={history} emptyLabel="No KRS history available." />
      </div>
    </section>
  );
}
