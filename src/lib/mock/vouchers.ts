export type Voucher = {
  id: string;
  code: string;
  type: "Percent" | "Fixed";
  value: number;
  scope: string;
};

export const vouchers: Voucher[] = [
  { id: "v1", code: "WELCOME10", type: "Percent", value: 10, scope: "All" },
  { id: "v2", code: "FREESHIP", type: "Fixed", value: 50000, scope: "VN" },
];


