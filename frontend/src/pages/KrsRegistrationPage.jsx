import { useEffect, useMemo, useState } from "react";
import Alert from "../components/common/Alert.jsx";
import LoadingState from "../components/common/LoadingState.jsx";
import Table from "../components/common/Table.jsx";
import KrsSummaryCard from "../components/krs/KrsSummaryCard.jsx";
import {
  addClassToKrs,
  createKrsDraft,
  getAvailableClasses,
  getCurrentKrs,
  removeClassFromKrs,
  submitKrs,
} from "../services/api.js";
import { getPayload, toArray } from "../utils/apiData.js";

export default function KrsRegistrationPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [availableClasses, setAvailableClasses] = useState([]);
  const [currentKrs, setCurrentKrs] = useState(null);

  const refreshData = async () => {
    const [classesResponse, krsResponse] = await Promise.all([
      getAvailableClasses(),
      getCurrentKrs(),
    ]);

    setAvailableClasses(toArray(getPayload(classesResponse)));
    setCurrentKrs(getPayload(krsResponse));
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        await refreshData();
      } catch (err) {
        setError(err.message || "Failed to load KRS registration data");
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

  const handleCreateDraft = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const firstClass = availableClasses[0];
      const academicYearId = firstClass?.academic_year_id || firstClass?.academicYearId;

      if (!academicYearId) {
        throw new Error("Cannot determine active academic year from available classes.");
      }

      await createKrsDraft(academicYearId);
      await refreshData();
      setSuccess("KRS draft created successfully.");
    } catch (err) {
      setError(err.message || "Failed to create KRS draft");
    } finally {
      setSaving(false);
    }
  };

  const handleAddClass = async (classItem) => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const classId = classItem.class_id || classItem.id;
      const krsId = currentKrs?.id || currentKrs?.krs_id;

      if (!krsId) {
        throw new Error("Please create KRS draft first.");
      }

      await addClassToKrs(krsId, classId);
      await refreshData();
      setSuccess("Class added to KRS.");
    } catch (err) {
      setError(err.message || "Failed to add class");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveClass = async (detailItem) => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const detailId = detailItem.id || detailItem.krs_detail_id;
      await removeClassFromKrs(detailId);
      await refreshData();
      setSuccess("Class removed from KRS.");
    } catch (err) {
      setError(err.message || "Failed to remove class");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const krsId = currentKrs?.id || currentKrs?.krs_id;
      await submitKrs(krsId);
      await refreshData();
      setSuccess("KRS submitted successfully.");
    } catch (err) {
      setError(err.message || "Failed to submit KRS");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingState label="Loading registration page..." />;
  }

  const classColumns = [
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
      key: "sks",
      label: "SKS",
      render: (row) => Number(row.sks || 0),
    },
    {
      key: "capacity",
      label: "Capacity",
      render: (row) => `${row.current_enrollment || 0}/${row.capacity || 0}`,
    },
    {
      key: "action",
      label: "Action",
      render: (row) => {
        const isFull = Number(row.current_enrollment || 0) >= Number(row.capacity || 0);
        return (
          <button className="btn" disabled={saving || isFull || !currentKrs} onClick={() => handleAddClass(row)}>
            {isFull ? "Full" : "Add"}
          </button>
        );
      },
    },
  ];

  const selectedColumns = [
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
      key: "sks",
      label: "SKS",
      render: (row) => Number(row.sks || 0),
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <button className="btn btn-danger" disabled={saving || currentKrs?.status !== "draft"} onClick={() => handleRemoveClass(row)}>
          Remove
        </button>
      ),
    },
  ];

  return (
    <section>
      <div className="card">
        <h2>KRS Registration</h2>
        <p className="eyebrow">Pilih kelas sesuai batas SKS, kapasitas, dan jadwal.</p>
      </div>

      <Alert type="error" message={error} />
      <Alert type="success" message={success} />

      {!currentKrs && (
        <div className="card">
          <p>Anda belum memiliki draft KRS untuk semester aktif.</p>
          <button className="btn" onClick={handleCreateDraft} disabled={saving}>
            {saving ? "Creating..." : "Create KRS Draft"}
          </button>
        </div>
      )}

      {currentKrs && (
        <>
          <KrsSummaryCard krs={summary} />

          <div className="card">
            <h3>Selected Classes</h3>
            <Table columns={selectedColumns} data={detailRows} emptyLabel="No class selected." />
            <div style={{ marginTop: "12px" }}>
              <button
                className="btn"
                onClick={handleSubmit}
                disabled={saving || detailRows.length === 0 || currentKrs?.status !== "draft"}
              >
                {saving ? "Submitting..." : "Submit KRS"}
              </button>
            </div>
          </div>
        </>
      )}

      <div className="card">
        <h3>Available Classes</h3>
        <Table columns={classColumns} data={availableClasses} emptyLabel="No available classes." />
      </div>
    </section>
  );
}
