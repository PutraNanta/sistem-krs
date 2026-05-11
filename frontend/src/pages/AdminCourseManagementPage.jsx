import { useEffect, useState } from "react";
import Alert from "../components/common/Alert.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import Table from "../components/common/Table.jsx";
import { getCourses } from "../services/api.js";
import { getPayload, toArray } from "../utils/apiData.js";

export default function AdminCourseManagementPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getCourses();
        setCourses(toArray(getPayload(response)));
      } catch (err) {
        setError(err.message || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <LoadingState label="Loading courses..." />;
  }

  const columns = [
    {
      key: "code",
      label: "Code",
      render: (row) => row.code || row.course_code || "-",
    },
    {
      key: "name",
      label: "Course Name",
      render: (row) => row.name || row.course_name || "-",
    },
    {
      key: "sks",
      label: "SKS",
      render: (row) => Number(row.sks || 0),
    },
    {
      key: "semester",
      label: "Semester",
      render: (row) => row.semester || "-",
    },
  ];

  return (
    <section>
      <div className="card">
        <h2>Admin Course Management</h2>
        <p className="eyebrow">Daftar mata kuliah aktif untuk perencanaan semester.</p>
      </div>
      <Alert type="error" message={error} />
      <div className="card">
        <Table columns={columns} data={courses} emptyLabel="No course data." />
      </div>
    </section>
  );
}
