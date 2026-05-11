import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/common/Alert.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import KrsSummaryCard from "../components/krs/KrsSummaryCard.jsx";
import useAuth from "../hooks/useAuth.js";
import { getAvailableClasses, getCurrentKrs } from "../services/api.js";
import { getPayload, toArray } from "../utils/apiData.js";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentKrs, setCurrentKrs] = useState(null);
  const [availableClasses, setAvailableClasses] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      setError("");

      try {
        const [krsResponse, classesResponse] = await Promise.all([
          getCurrentKrs(),
          getAvailableClasses(),
        ]);

        const krs = getPayload(krsResponse);
        const classes = toArray(getPayload(classesResponse));

        setCurrentKrs(krs || null);
        setAvailableClasses(classes);
      } catch (err) {
        setError(err.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const summary = useMemo(() => {
    const details = currentKrs?.details || currentKrs?.krsDetails || [];
    const totalSks = details.reduce((sum, item) => sum + Number(item.sks || 0), 0);

    return {
      totalSks,
      totalClasses: details.length,
      status: currentKrs?.status || "draft",
    };
  }, [currentKrs]);

  if (loading) {
    return <LoadingState label="Loading dashboard..." />;
  }

  return (
    <section>
      <div className="card">
        <h2>Welcome, {user?.name || "Student"}</h2>
        <p className="eyebrow">Pantau progres KRS semester aktif anda.</p>
      </div>

      <Alert type="error" message={error} />

      <KrsSummaryCard krs={summary} />

      <div className="grid-2">
        <article className="card">
          <h3>Aksi Cepat</h3>
          <p>Mulai isi KRS atau lihat detail pengajuan.</p>
          <div style={{ display: "flex", gap: "10px" }}>
            <Link className="btn" to="/student/krs">
              Buka Registrasi
            </Link>
            <Link className="btn btn-outline" to="/student/krs/history">
              Riwayat
            </Link>
          </div>
        </article>

        <article className="card">
          <h3>Available Class Snapshot</h3>
          <p>{availableClasses.length} kelas tersedia untuk dipilih.</p>
          <p className="eyebrow">Pastikan jadwal tidak bentrok sebelum submit KRS.</p>
        </article>
      </div>
    </section>
  );
}
