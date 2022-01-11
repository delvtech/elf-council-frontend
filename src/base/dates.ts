import { timeFormat } from "d3-time-format";
import { formatDuration, intervalToDuration } from "date-fns";
import { ONE_MINUTE_IN_MILLISECONDS } from "src/base/time";
import { t } from "ttag";

/**
 * Formats a Date object, eg: "27"
 */
export const formatDay = timeFormat("%d");
/**
 * Formats a Date object, eg: "January 30, 2021"
 */
export const formatFullDate = timeFormat("%B %d, %Y");

/**
 * Formats a Date object, eg: "Jan 30, 2021"
 */
export const formatAbbreviatedDate = timeFormat("%b %d, %Y");

/**
 * Formats a Date object, eg: "Jan 30"
 */
export const formatAbbreviatedMonthAndDay = timeFormat("%b %d");

/**
 * Formats a Date object, eg: "2021"
 */
export const formatYear = timeFormat("%Y");

/**
 * Returns a human-readable label for how much time is left between now and the
 * given end time.
 *
 * Note: inputs are in milliseconds.
 */
export function formatTimeLeft(
  start: number,
  end: number,
  abbreviate?: boolean,
): string {
  const duration = intervalToDuration({
    start: start,
    end: end,
  });
  const { months, days } = duration;

  if (end - start < ONE_MINUTE_IN_MILLISECONDS) {
    return t`less than one minute`;
  }

  let format = ["months", "days", "hours", "minutes"];

  if (months) {
    format = ["months", "days"];
  } else if (days && days > 1) {
    format = ["days", "hours"];
  } else if (days && days <= 1) {
    format = ["days", "hours", "minutes"];
  }

  const timeLeft = formatDuration(duration, {
    delimiter: ", ",
    format,
  });

  if (abbreviate) {
    let abbreviatedTimeLeft = timeLeft.replace(" hours, ", ":");
    abbreviatedTimeLeft = abbreviatedTimeLeft.replace("minutes", ":");
    abbreviatedTimeLeft = abbreviatedTimeLeft.replace("seconds", ":");
    return abbreviatedTimeLeft;
  }

  return timeLeft;
}
