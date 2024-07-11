import { format } from "date-fns";
import { DateRange } from "react-day-picker";

export function formatDate(dates?: DateRange) {
  if (!dates?.from || !dates.to) return "When?";

  // Dec 20, 2024 to Jan 10, 2025
  return `${format(dates.from, "PP").replace(/ /g, "\u00A0")} to ${format(dates.to, "PP").replace(/ /g, "\u00A0")}`;
}
