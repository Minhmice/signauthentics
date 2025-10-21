import Section from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, Percent } from "lucide-react";
import { vouchers } from "@/lib/mock/vouchers";

export default function DashboardVouchersPage() {
  return (
    <div className="space-y-8">
      <Section title="Quản lý mã giảm giá">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-zinc-600">{vouchers.length} mã giảm giá</div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tạo mã giảm giá mới
          </Button>
        </div>

        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Mã</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Mô tả</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Giảm giá</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Hết hạn</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Trạng thái</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {vouchers.map((voucher) => (
                    <tr key={voucher.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-accent" />
                          <span className="font-mono font-semibold">{voucher.code}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{voucher.description}</td>
                      <td className="py-3 px-4">
                        <span className="chip text-xs bg-green-100 text-green-700">
                          {voucher.discountType === "percentage" ? `${voucher.discountValue}%` : `${voucher.discountValue.toLocaleString()} VND`}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm">{new Date(voucher.expiryDate).toLocaleDateString("vi-VN")}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`chip text-xs ${voucher.active ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-700"}`}>{voucher.active ? "Hoạt động" : "Không hoạt động"}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-zinc-600" />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}


