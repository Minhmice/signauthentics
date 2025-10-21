import { fx } from "@/lib/mock/fx";

export function formatVND(value: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
}

export function formatEUR(value: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "EUR" }).format(value);
}

export function formatPrice(value: number, currency: "VND" | "EUR" = "VND") {
  return currency === "VND" ? formatVND(value) : formatEUR(value);
}

export function vndToEur(value: number) {
  return value * fx.vndToEur;
}


