import { useEffect, useMemo, useState } from "react";
import Alert from "../components/common/Alert.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import Table from "../components/common/Table.jsx";
import ClassScheduleCard from "../components/krs/ClassScheduleCard.jsx";
import KrsSummaryCard from "../components/krs/KrsSummaryCard.jsx";
import { getCurrentKrs } from "../services/api.js";
import { getPayload } from "../utils/apiData.js";

export default function KrsDetailPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentKrs, setCurrentKrs] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getCurrentKrs();
        setCurrentKrs(getPayload(response));
      } catch (err) {
        setError(err.message || "Failed to load KRS detail");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const detailRows = useMemo(() => currentKrs?.details || currentKrs?.krsDetails || [], [currentKrs]);

  const summary = useMemo(() => {
    const totalSks = detailRows.reduce((sum, item) => sum + Number(item.sks || 0), 0);
    return {
      totalSks,
      totalClasses: detailRows.length,
      status: currentKrs?.status || "draft",
    };
  }, [detailRows, currentKrs]);

  if (loading) {
    return <LoadingState label="Loading KRS detail..." />;
  }

  const columns = [
    {
      key: "course_name",
      label: "Course",
      render: (row) => row.course_name || row.courseName || "-",
    },
    {
      key: "class_code",
      label: "Class",
      render: (row) => row.class_code || row.classCode || "-",
    },
    {
      key: "lecturer_name",
      label: "Lecturer",
      render: (row) => row.lecturer_name || row.lecturerName || "-",
    },
    {
      key: "sks",
      label: "SKS",
      render: (row) => Number(row.sks || 0),
    },
  ];

  return (
    <section>
      <div className="card">
        <h2>KRS Detail</h2>
        <p className="eyebrow">Detail pengajuan KRS semester berjalan.</p>
      </div>

      <Alert type="error" message={error} />

      {!currentKrs ? (
        <div className="card">
          <p>Tidak ada KRS aktif.</p>
        </div>
      ) : (
        <>
          <KrsSummaryCard krs={summary} />

          <div className="card">
            <h3>Selected Classes</h3>
            <Table columns={columns} data={detailRows} emptyLabel="No selected class." />
          </div>

          {detailRows.map((row, index) => (
            <div key={row.id || index} className="card">
              <h4>{row.course_name || row.courseName || "Class"}</h4>
              <ClassScheduleCard schedules={row.schedules || []} />
            </div>
          ))}
        </>
      )}
    </section>
  );
}
