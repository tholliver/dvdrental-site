import {
    diffSeconds,
    diffMinutes,
    diffHours,
    diffDays,
    diffWeeks,
    diffMonths,
    diffYears,
} from "@formkit/tempo";

export function timeAgo(date: string | Date): string {
    const now = new Date();

    const years = diffYears(now, date);
    if (years > 0) return years === 1 ? "1 year ago" : `${years} years ago`;

    const months = diffMonths(now, date);
    if (months > 0) return months === 1 ? "1 month ago" : `${months} months ago`;

    const weeks = diffWeeks(now, date, "floor");
    if (weeks > 0) return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;

    const days = diffDays(now, date, "floor");
    if (days > 0) return days === 1 ? "1 day ago" : `${days} days ago`;

    const hours = diffHours(now, date, "floor");
    if (hours > 0) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;

    const minutes = diffMinutes(now, date, "floor");
    if (minutes > 0) return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;

    const seconds = diffSeconds(now, date, "floor");
    return seconds <= 5 ? "just now" : `${seconds} seconds ago`;
}
