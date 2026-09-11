import Link from "next/link";

export default function home() {
  return (
    <div>
      <h1>병의원 찾기 서비스</h1>
      <p>국립중앙의료원_전국 병·의원 찾기 데이터를 활용하여 개발하였습니다.</p>
        <Link href="/hospitals/region">
          <h2>시/도·시/군/구로 찾기</h2>
        </Link>
          <p>지역을 선택해서 병원을 검색합니다.</p>
        <Link href="/hospitals/nearby">
          <h2>내 주변 병원 찾기</h2>
        </Link>
          <p>현재 위치 기준으로 가까운 병원을 찾습니다.</p>
    </div>
  )
}
