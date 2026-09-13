import { NextRequest, NextResponse } from "next/server";

const BASE_URL =
  "https://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const params = new URLSearchParams({
    serviceKey: process.env.HSPTLMDCNC_API_KEY!,
    WGS84_LON: searchParams.get("lon") ?? "",
    WGS84_LAT: searchParams.get("lat") ?? "",
    Radius: searchParams.get("radius") ?? "",
    _type: "json",
  });

  const finalUrl = `${BASE_URL}?${params.toString()}`;

  try {
    const res = await fetch(finalUrl, {
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    return NextResponse.json(
      { error: "병의원 데이터를 불러오지 못했습니다." },
      { status: 500 }
    );
  }
}