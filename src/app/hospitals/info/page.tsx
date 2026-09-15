"use client";

import { useState } from "react";
import type { Infos, InfoApiResponse } from "../../types/infos";

export default function Info() {
  const [hpid, setHpid] = useState("A1124291");
  const [pageNo, setPageNo] = useState("1");
  const [numOfRows, setNumOfRows] = useState("10");
  const [infos, setInfos] = useState<Infos[]>([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const search = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ hpid, pageNo, numOfRows });
      const res = await fetch(`/api/info?${params.toString()}`);
      const data: InfoApiResponse = await res.json();
      console.log("응답:", data);

      const items = data.response.body.items.item;
      setInfos(Array.isArray(items) ? items : items ? [items] : []);
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
        <input value={hpid} onChange={(e) => setHpid(e.target.value)} placeholder="병원 ID" />
        <input value={pageNo} onChange={(e) => setPageNo(e.target.value)} placeholder="페이지 번호" />
        <input value={numOfRows} onChange={(e) => setNumOfRows(e.target.value)} placeholder="결과 수" />
        <button onClick={search} disabled={loading}>
          {loading ? "검색 중..." : "검색"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {infos.map((h, i) => (
          <li key={i} style={{ marginBottom: 12 }}>
            <strong>{h.dutyName}</strong>
            <br />
            {h.dgidIdName}
            <br />
            {h.dutyInf}
          </li>
        ))}
      </ul>
    </main>
  );
}