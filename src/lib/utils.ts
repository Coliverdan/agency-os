import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFCFA(amount: number): string {
  return new Intl.NumberFormat("fr-FR").format(amount) + " FCFA";
}

export function formatTimeAgo(isoDate?: string): string {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "il y a quelques secondes";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `il y a ${diffInMinutes} min`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `il y a ${diffInHours} h`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `il y a ${diffInDays} j`;
}
