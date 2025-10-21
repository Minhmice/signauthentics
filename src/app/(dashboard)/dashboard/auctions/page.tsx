import Section from "@/components/ui/Section";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { auctions } from "@/lib/mock/auctions";
import { products } from "@/lib/mock/products";
import { formatPrice } from "@/lib/ui/price";
import { Plus, Edit, Trash } from "lucide-react";

export default function DashboardAuctionsPage() {
  return (
    <div className="space-y-8">
      <Section title="Quản lý đấu giá">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-zinc-600">{auctions.length} phiên đấu giá</div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Tạo phiên đấu giá mới
          </Button>
        </div>

        <Card>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Sản phẩm</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Giá cao nhất</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Kết thúc</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Trạng thái</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {auctions.map((auction) => {
                    const product = products.find((p) => p.id === auction.productId);
                    return (
                      <tr key={auction.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                        <td className="py-3 px-4 text-sm font-mono">{auction.id}</td>
                        <td className="py-3 px-4">
                          <div className="font-medium line-clamp-1">{product?.title || "N/A"}</div>
                        </td>
                        <td className="py-3 px-4 text-sm font-semibold">{formatPrice(auction.highestBidVND, "VND")}</td>
                        <td className="py-3 px-4 text-sm">{new Date(auction.endAt).toLocaleString("vi-VN")}</td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`chip text-xs ${
                              auction.status === "live" ? "bg-green-100 text-green-700" : auction.status === "upcoming" ? "bg-orange-100 text-orange-700" : "bg-zinc-100 text-zinc-700"
                            }`}
                          >
                            {auction.status === "live" ? "Đang diễn ra" : auction.status === "upcoming" ? "Sắp diễn ra" : "Đã kết thúc"}
                          </span>
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
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </Section>
    </div>
  );
}


