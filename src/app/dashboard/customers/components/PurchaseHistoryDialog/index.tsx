"use client";

/**
 * Purchase History Dialog
 * Dialog để xem lịch sử mua hàng và đấu giá của customer
 */

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, ShoppingCart, Gavel, Package, Calendar, DollarSign } from "lucide-react";
import type { Customer, Order, Auction } from "@/lib/mock/db";
import { customersAPI } from "@/lib/mock/db";
import { formatPrice } from "@/lib/ui/price";
import { ClientDate } from "@/components/shared/ClientDate";

interface PurchaseHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer;
}

export function PurchaseHistoryDialog({ open, onOpenChange, customer }: PurchaseHistoryDialogProps) {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [auctions, setAuctions] = React.useState<Auction[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (open && customer) {
      loadPurchaseHistory();
    }
  }, [open, customer]);

  const loadPurchaseHistory = async () => {
    if (!customer) return;
    
    setLoading(true);
    try {
      const history = await ((customersAPI as Record<string, unknown>).getPurchaseHistory as (id: string) => Promise<{ orders: Order[]; auctions: Auction[] }>)(customer.id);
      setOrders(history.orders);
      setAuctions(history.auctions);
    } catch (error) {
      console.error("Error loading purchase history:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return <ClientDate date={dateString} variant="vn" />;
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      case 'active': return 'default';
      case 'ended': return 'secondary';
      default: return 'outline';
    }
  };

  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[80vw] !max-h-[80vh] !w-[80vw] !h-[80vh] overflow-y-auto bg-zinc-900 border-zinc-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="w-5 h-5 text-blue-500" />
            Purchase History - {customer.name}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            View all orders and auction participation history for this customer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-zinc-400">Total Orders</span>
                </div>
                <p className="text-2xl font-bold text-white">{customer.totalOrders}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-zinc-400">Total Spent</span>
                </div>
                <p className="text-2xl font-bold text-white">{formatPrice(customer.totalSpent)}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Gavel className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-zinc-400">Total Bids</span>
                </div>
                <p className="text-2xl font-bold text-white">{customer.totalBids}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-zinc-800 border-zinc-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-zinc-400">Won Auctions</span>
                </div>
                <p className="text-2xl font-bold text-white">{customer.wonAuctions}</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for Orders and Auctions */}
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-zinc-800">
              <TabsTrigger value="orders" className="data-[state=active]:bg-zinc-700">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Orders ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="auctions" className="data-[state=active]:bg-zinc-700">
                <Gavel className="w-4 h-4 mr-2" />
                Auctions ({auctions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              {loading ? (
                <div className="text-center py-8 text-zinc-400">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-zinc-400">No orders found</div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <Card key={order.id} className="bg-zinc-800 border-zinc-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-white">Order #{order.orderId}</span>
                              <Badge variant={getStatusColor(order.fulfillmentStatus)}>{order.fulfillmentStatus}</Badge>
                            </div>
                            <div className="text-sm text-zinc-400">
                              <div className="flex items-center gap-1 mb-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(order.createdAt)}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                Total: {formatPrice(order.total)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-zinc-400">Payment: {order.paymentMethod}</p>
                            <p className="text-sm text-zinc-400">Status: {order.paymentStatus}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="auctions" className="space-y-4">
              {loading ? (
                <div className="text-center py-8 text-zinc-400">Loading auctions...</div>
              ) : auctions.length === 0 ? (
                <div className="text-center py-8 text-zinc-400">No auction participation found</div>
              ) : (
                <div className="space-y-3">
                  {auctions.map((auction) => (
                    <Card key={auction.id} className="bg-zinc-800 border-zinc-700">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-white">{auction.productTitle}</span>
                              <Badge variant={getStatusColor(auction.status)}>{auction.status}</Badge>
                            </div>
                            <div className="text-sm text-zinc-400">
                              <div className="flex items-center gap-1 mb-1">
                                <Calendar className="w-3 h-3" />
                                Started: {formatDate(auction.startAt)}
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                Current Bid: {formatPrice(auction.highestBidVND)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-zinc-400">Bidders: {auction.biddersCount}</p>
                            {auction.highestBidderId === customer.id && (
                              <Badge variant="default" className="mt-1">Winner</Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
