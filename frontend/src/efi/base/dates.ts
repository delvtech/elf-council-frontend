import { timeFormat } from "d3-time-format";

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
