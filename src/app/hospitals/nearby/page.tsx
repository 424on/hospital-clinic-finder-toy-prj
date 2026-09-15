"use client";

import { useState } from "react";
import type { Regions, RegionApiResponse } from "../../types/regions";

export default function Region() {
  const [lat, setLat] = useState("37.5760");
  const [lon, setLon] = useState("126.9769");
  const [radius, setRadius] = useState("1000");
  const [regions, setRegions] = useState<Regions[]>([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const search = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ lon, lat, radius });
      const res = await fetch(`/api/regions?${params.toString()}`);
      const data: RegionApiResponse = await res.json();
      console.log("응답:", data);

      const items = data.response.body.items.item;
      setRegions(Array.isArray(items) ? items : items ? [items] : []);
    } catch {
      setError("검색 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1>근처 병·의원 찾기</h1>
      <h2>위치를 입력하여 근처 병·의원을 검색하세요.</h2>

      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="위도" />
        <input value={lon} onChange={(e) => setLon(e.target.value)} placeholder="경도" />
        <input value={radius} onChange={(e) => setRadius(e.target.value)} placeholder="반경(m)" />
        <button onClick={search} disabled={loading}>
          {loading ? "검색 중..." : "검색"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {regions.map((h, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <strong>{h.dutyName}</strong>
            <br />
            {h.dutyAddr}
            <br />
            {h.distance && <span>거리: {h.distance}m</span>}
          </li>
        ))}
      </ul>
    </main>
  );
}