import { useEffect, useState } from "react";
import Alert from "../components/common/Alert.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import Table from "../components/common/Table.jsx";
import { getAvailableClasses } from "../services/api.js";
import { getPayload, toArray } from "../utils/apiData.js";

export default function AdminClassManagementPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getAvailableClasses();
        setClasses(toArray(getPayload(response)));
      } catch (err) {
        setError(err.message || "Failed to load class data");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <LoadingState label="Loading classes..." />;
  }

  const columns = [
    {
      key: "class_code",
      label: "Class Code",
      render: (row) => row.class_code || row.classCode || "-",
    },
    {
      key: "course_name",
      label: "Course",
      render: (row) => row.course_name || row.courseName || "-",
    },
    {
      key: "lecturer_name",
      label: "Lecturer",
      render: (row) => row.lecturer_name || row.lecturerName || "-",
    },
    {
      key: "quota",
      label: "Quota",
      render: (row) => `${row.current_enrollment || 0}/${row.capacity || 0}`,
    },
    {
      key: "status",
      label: "Status",
      render: (row) =>
        Number(row.current_enrollment || 0) >= Number(row.capacity || 0) ? "Full" : "Open",
    },
  ];

  return (
    <section>
      <div className="card">
        <h2>Admin Class Management</h2>
        <p className="eyebrow">Monitoring kapasitas kelas dan distribusi dosen pengampu.</p>
      </div>
      <Alert type="error" message={error} />
      <div className="card">
        <Table columns={columns} data={classes} emptyLabel="No class data." />
      </div>
    </section>
  );
}
