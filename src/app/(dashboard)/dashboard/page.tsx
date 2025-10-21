import Section from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Package, Users, DollarSign, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/ui/price";

const kpis = [
  { label: "Doanh thu", value: "245,000,000", change: "+12.5%", trend: "up", icon: DollarSign, color: "text-green-500" },
  { label: "Đơn hàng", value: "856", change: "+8.2%", trend: "up", icon: ShoppingCart, color: "text-blue-500" },
  { label: "Sản phẩm", value: "1,234", change: "-3.1%", trend: "down", icon: Package, color: "text-orange-500" },
  { label: "Người dùng", value: "12,345", change: "+18.7%", trend: "up", icon: Users, color: "text-purple-500" },
];

const recentOrders = [
  { id: "ORD-001", customer: "Nguyễn Văn A", product: "Áo Đấu Vietnam #10", amount: 2500000, status: "completed" },
  { id: "ORD-002", customer: "Trần Thị B", product: "Bóng Có Chữ Ký", amount: 5000000, status: "pending" },
  { id: "ORD-003", customer: "Lê Văn C", product: "Poster Đội Tuyển", amount: 1200000, status: "completed" },
  { id: "ORD-004", customer: "Phạm Thị D", product: "Giày Signed", amount: 8500000, status: "processing" },
  { id: "ORD-005", customer: "Hoàng Văn E", product: "Găng Tay Thủ Môn", amount: 3200000, status: "completed" },
];

export default function DashboardHomePage() {
  return (
    <div className="space-y-8">
      {/* KPIs */}
      <Section title="Tổng quan">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.label}>
                <CardContent>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm text-zinc-500 mb-1">{kpi.label}</div>
                      <div className="text-2xl font-bold">{kpi.value}</div>
                      <div className="flex items-center gap-1 mt-2">
                        {kpi.trend === "up" ? <TrendingUp className="w-4 h-4 text-green-500" /> : <TrendingDown className="w-4 h-4 text-red-500" />}
                        <span className={`text-sm font-medium ${kpi.trend === "up" ? "text-green-500" : "text-red-500"}`}>{kpi.change}</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl bg-zinc-100 ${kpi.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Chart Placeholder */}
      <Section title="Biểu đồ doanh thu">
        <Card>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-zinc-200 rounded-xl">
              <div className="text-center text-zinc-400">
                <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                <div className="text-sm">Biểu đồ doanh thu theo tháng</div>
                <div className="text-xs">(Chart placeholder)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Recent Orders */}
      <Section title="Đơn hàng gần đây">
        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Mã đơn</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Khách hàng</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Sản phẩm</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-zinc-700">Số tiền</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-mono">{order.id}</td>
                      <td className="py-3 px-4 text-sm">{order.customer}</td>
                      <td className="py-3 px-4 text-sm">{order.product}</td>
                      <td className="py-3 px-4 text-sm text-right font-semibold">{formatPrice(order.amount, "VND")}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : order.status === "processing"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {order.status === "completed" ? "Hoàn thành" : order.status === "processing" ? "Đang xử lý" : "Chờ xử lý"}
                        </span>
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


