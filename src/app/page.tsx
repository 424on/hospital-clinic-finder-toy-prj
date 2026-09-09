"use client";

import { useState } from "react";
import type { Hospital, HospitalApiResponse } from "./types/hospital";
import { getWeeklyHours, formatTime } from "./utils/hospitalHours";

export default function Home() {
  const [sido, setSido] = useState("서울특별시");
  const [sigungu, setSigungu] = useState("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ sido, sigungu });
      const res = await fetch(`/api/hospitals?${params.toString()}`);
      const data: HospitalApiResponse = await res.json();

      const items = data.response.body.items.item;
      setHospitals(Array.isArray(items) ? items : items ? [items] : []);
    } catch {
      setError("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>병·의원 찾기</h1>

      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <input value={sido} onChange={(e) => setSido(e.target.value)} placeholder="시도" />
        <input value={sigungu} onChange={(e) => setSigungu(e.target.value)} placeholder="시군구" />
        <button onClick={search} disabled={loading}>
          {loading ? "검색 중..." : "검색"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {hospitals.map((h, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <strong>{h.dutyName}</strong>
            <br />
            {h.dutyAddr}
            <br />
            {h.dutyTel1}

            <ul style={{ marginTop: 8, fontSize: 14, color: "#555" }}>
              {getWeeklyHours(h).map(({ day, start, end }) => (
                <li key={day}>
                  {day}: {start && end ? `${formatTime(start)} ~ ${formatTime(end)}` : "휴무"}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}