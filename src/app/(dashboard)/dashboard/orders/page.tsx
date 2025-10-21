import Section from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/ui/price";
import { Eye, Download } from "lucide-react";

const mockOrders = [
  { id: "ORD-001", customer: "Nguyễn Văn A", email: "nguyenvana@gmail.com", total: 2500000, status: "completed", date: "2024-01-15" },
  { id: "ORD-002", customer: "Trần Thị B", email: "tranthib@gmail.com", total: 5000000, status: "pending", date: "2024-01-14" },
  { id: "ORD-003", customer: "Lê Văn C", email: "levanc@gmail.com", total: 1200000, status: "completed", date: "2024-01-13" },
  { id: "ORD-004", customer: "Phạm Thị D", email: "phamthid@gmail.com", total: 8500000, status: "processing", date: "2024-01-12" },
  { id: "ORD-005", customer: "Hoàng Văn E", email: "hoangvane@gmail.com", total: 3200000, status: "completed", date: "2024-01-11" },
  { id: "ORD-006", customer: "Đặng Thị F", email: "dangthif@gmail.com", total: 4500000, status: "cancelled", date: "2024-01-10" },
  { id: "ORD-007", customer: "Vũ Văn G", email: "vuvang@gmail.com", total: 6700000, status: "completed", date: "2024-01-09" },
  { id: "ORD-008", customer: "Bùi Thị H", email: "buithih@gmail.com", total: 2100000, status: "processing", date: "2024-01-08" },
];

export default function DashboardOrdersPage() {
  return (
    <div className="space-y-8">
      <Section title="Quản lý đơn hàng">
        <div className="text-sm text-zinc-600 mb-4">{mockOrders.length} đơn hàng</div>

        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Mã đơn</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Khách hàng</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Email</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-700">Tổng tiền</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Ngày đặt</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Trạng thái</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-mono">{order.id}</td>
                      <td className="py-3 px-4 text-sm font-medium">{order.customer}</td>
                      <td className="py-3 px-4 text-sm text-zinc-600">{order.email}</td>
                      <td className="py-3 px-4 text-sm text-right font-semibold">{formatPrice(order.total, "VND")}</td>
                      <td className="py-3 px-4 text-sm">{new Date(order.date).toLocaleDateString("vi-VN")}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`chip text-xs ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : order.status === "processing"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "pending"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status === "completed" ? "Hoàn thành" : order.status === "processing" ? "Đang xử lý" : order.status === "pending" ? "Chờ xử lý" : "Đã hủy"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-zinc-600" />
                          </button>
                          <button className="p-2 hover:bg-zinc-100 rounded-lg transition-colors">
                            <Download className="w-4 h-4 text-zinc-600" />
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


