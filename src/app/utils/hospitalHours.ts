import type { Hospital } from "../types/hospital";

export interface DailyHours {
  day: string;
  start?: string | number;
  end?: string | number;
}

const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일", "공휴일"];

export function getWeeklyHours(hospital: Hospital): DailyHours[] {
  return DAY_LABELS.map((day, i) => {
    const idx = i + 1;
    const start = hospital[`dutyTime${idx}s` as keyof Hospital] as string | undefined;
    const end = hospital[`dutyTime${idx}c` as keyof Hospital] as string | undefined;
    return { day, start, end };
  });
}

export function formatTime(raw?: string | number): string {
  if (raw === undefined || raw === null || raw === "") return "정보없음";

  const str = String(raw).padStart(4, "0"); // 숫자로 오면 문자열로 변환 + 4자리 보정
  if (str.length !== 4) return "정보없음";

  return `${str.slice(0, 2)}:${str.slice(2)}`;
}