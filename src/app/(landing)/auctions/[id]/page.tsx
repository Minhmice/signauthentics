"use client";
import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import { auctions } from "@/lib/mock/auctions";
import { products } from "@/lib/mock/products";
import { formatPrice } from "@/lib/ui/price";
import Image from "next/image";
import { useState } from "react";
import { Clock, Gavel } from "lucide-react";

const mockBids = [
  { id: 1, bidder: "Nguyễn Văn A", amount: 5000000, time: "2024-01-15 14:30:00" },
  { id: 2, bidder: "Trần Thị B", amount: 4800000, time: "2024-01-15 14:25:00" },
  { id: 3, bidder: "Lê Văn C", amount: 4500000, time: "2024-01-15 14:20:00" },
  { id: 4, bidder: "Phạm Thị D", amount: 4200000, time: "2024-01-15 14:15:00" },
];

export default function AuctionDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const auction = auctions.find((a) => a.id === id) ?? auctions[0];
  const product = products.find((p) => p.id === auction.productId) ?? products[0];
  const [tab, setTab] = useState("bids");

  return (
    <div className="space-y-8">
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gallery */}
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src={product.images[0]} alt={product.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${auction.status === "live" ? "bg-green-500 text-white" : "bg-orange-500 text-white"}`}>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {auction.status === "live" ? "Đang diễn ra" : "Sắp diễn ra"}
              </div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">{product.title}</h1>
            </div>

            <Card className="bg-zinc-50">
              <CardContent>
                <div className="text-sm text-zinc-600 mb-1">Giá hiện tại</div>
                <div className="text-3xl font-bold text-accent mb-4">{formatPrice(auction.highestBidVND, "VND")}</div>

                {auction.status === "live" && (
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <Clock className="w-4 h-4" />
                    <span>Kết thúc: {new Date(auction.endAt).toLocaleString("vi-VN")}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {auction.status === "live" && (
              <div className="flex gap-3">
                <input type="number" placeholder="Nhập giá đặt..." className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition" />
                <Button className="px-8">
                  <Gavel className="w-4 h-4 mr-2" />
                  Đặt giá
                </Button>
              </div>
            )}

            {/* Tabs */}
            <div>
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList>
                  <TabsTrigger value="bids">Lịch sử đấu giá</TabsTrigger>
                  <TabsTrigger value="details">Chi tiết</TabsTrigger>
                  <TabsTrigger value="shipping">Vận chuyển</TabsTrigger>
                </TabsList>
                <TabsContent value="bids">
                  {/* Bids content */}
                </TabsContent>
                <TabsContent value="details">
                  {/* Details content */}
                </TabsContent>
                <TabsContent value="shipping">
                  {/* Shipping content */}
                </TabsContent>
              </Tabs>

              <div className="mt-4">
                {tab === "bids" && (
                  <Card>
                    <CardContent>
                      <div className="space-y-3">
                        {mockBids.map((bid) => (
                          <div key={bid.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-200">
                            <div>
                              <div className="font-medium">{bid.bidder}</div>
                              <div className="text-xs text-zinc-500">{bid.time}</div>
                            </div>
                            <div className="text-lg font-bold text-accent">{formatPrice(bid.amount, "VND")}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {tab === "details" && (
                  <div className="prose max-w-none">
                    <p className="text-zinc-600">{product.title} - Món đồ lưu niệm đặc biệt với chữ ký chính thức.</p>
                  </div>
                )}

                {tab === "shipping" && (
                  <div className="text-sm text-zinc-600 space-y-2">
                    <p>✓ Miễn phí vận chuyển toàn quốc</p>
                    <p>✓ Giao hàng trong 3-5 ngày làm việc</p>
                    <p>✓ Đóng gói cẩn thận, bảo vệ sản phẩm</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}


