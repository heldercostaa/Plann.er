import { Dayjs } from "dayjs";

interface FormatDates {
  startsAt?: Dayjs;
  endsAt?: Dayjs;
}

export function formatDates({ startsAt, endsAt }: FormatDates) {
  if (!startsAt || !endsAt) return "When?";

  // Dec 20, 2024 to Jan 10, 2025
  return `${startsAt.format("ll").replace(/ /g, "\u00A0")} to ${endsAt.format("ll").replace(/ /g, "\u00A0")}`;
}
