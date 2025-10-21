"use client";
import Section from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { formatPrice } from "@/lib/ui/price";
import { useState } from "react";

const topCategories = [
  { name: "Áo Đấu", revenue: 125000000, growth: "+15%" },
  { name: "Bóng Có Chữ Ký", revenue: 95000000, growth: "+22%" },
  { name: "Giày", revenue: 78000000, growth: "+8%" },
  { name: "Găng Tay", revenue: 45000000, growth: "-5%" },
  { name: "Poster", revenue: 32000000, growth: "+12%" },
];

const topPlayers = [
  { name: "Đỗ Sỹ Huy", sales: 156, revenue: 45000000 },
  { name: "Quan Văn Chuẩn", sales: 132, revenue: 38000000 },
  { name: "Cao Văn Bình", sales: 118, revenue: 32000000 },
  { name: "Võ Minh Trọng", sales: 95, revenue: 28000000 },
  { name: "Nguyễn Đức Anh", sales: 87, revenue: 25000000 },
];

export default function DashboardReportsPage() {
  const [dateFrom, setDateFrom] = useState("2024-01-01");
  const [dateTo, setDateTo] = useState("2024-01-31");

  return (
    <div className="space-y-8">
      {/* Time Picker */}
      <Section title="Chọn khoảng thời gian">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label className="text-sm text-zinc-600 block mb-1">Từ ngày</label>
            <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="h-9 px-3 rounded-lg border border-zinc-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition" />
          </div>
          <div>
            <label className="text-sm text-zinc-600 block mb-1">Đến ngày</label>
            <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="h-9 px-3 rounded-lg border border-zinc-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition" />
          </div>
          <Button>
            <Calendar className="w-4 h-4 mr-2" />
            Áp dụng
          </Button>
        </div>
      </Section>

      {/* KPIs */}
      <Section title="Thống kê">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <div className="text-sm text-zinc-500 mb-1">Tổng doanh thu</div>
              <div className="text-3xl font-bold mb-2">{formatPrice(245000000, "VND")}</div>
              <div className="flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5% so với tháng trước</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-sm text-zinc-500 mb-1">Tổng đơn hàng</div>
              <div className="text-3xl font-bold mb-2">856</div>
              <div className="flex items-center gap-1 text-sm text-green-500">
                <TrendingUp className="w-4 h-4" />
                <span>+8.2% so với tháng trước</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="text-sm text-zinc-500 mb-1">Giá trị đơn trung bình</div>
              <div className="text-3xl font-bold mb-2">{formatPrice(286215, "VND")}</div>
              <div className="flex items-center gap-1 text-sm text-red-500">
                <TrendingDown className="w-4 h-4" />
                <span>-2.1% so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Top Categories & Players */}
      <Section title="Top danh mục & Cầu thủ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Categories */}
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Top danh mục sản phẩm</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="text-left py-2 px-3 text-sm font-semibold text-zinc-700">Danh mục</th>
                      <th className="text-right py-2 px-3 text-sm font-semibold text-zinc-700">Doanh thu</th>
                      <th className="text-right py-2 px-3 text-sm font-semibold text-zinc-700">Tăng trưởng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCategories.map((cat, index) => (
                      <tr key={cat.name} className="border-b border-zinc-100">
                        <td className="py-2 px-3 text-sm">
                          <span className="font-medium">#{index + 1}</span> {cat.name}
                        </td>
                        <td className="py-2 px-3 text-sm text-right font-semibold">{formatPrice(cat.revenue, "VND")}</td>
                        <td className={`py-2 px-3 text-sm text-right font-medium ${cat.growth.startsWith("+") ? "text-green-600" : "text-red-600"}`}>{cat.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Top Players */}
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4">Top cầu thủ bán chạy</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="text-left py-2 px-3 text-sm font-semibold text-zinc-700">Cầu thủ</th>
                      <th className="text-right py-2 px-3 text-sm font-semibold text-zinc-700">Số lượng</th>
                      <th className="text-right py-2 px-3 text-sm font-semibold text-zinc-700">Doanh thu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topPlayers.map((player, index) => (
                      <tr key={player.name} className="border-b border-zinc-100">
                        <td className="py-2 px-3 text-sm">
                          <span className="font-medium">#{index + 1}</span> {player.name}
                        </td>
                        <td className="py-2 px-3 text-sm text-right">{player.sales}</td>
                        <td className="py-2 px-3 text-sm text-right font-semibold">{formatPrice(player.revenue, "VND")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}


