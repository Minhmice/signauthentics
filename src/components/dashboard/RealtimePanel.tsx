"use client";

/**
 * Realtime Notification Panel
 * Slide-over panel hiển thị stream events: New Order, New Bid, Outbid, etc.
 */

import * as React from "react";
import { X, Filter, ShoppingCart, Gavel, MessageCircle, Clock } from "lucide-react";
import { NotificationEvent } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

interface RealtimePanelProps {
  isOpen: boolean;
  onClose: () => void;
  events?: NotificationEvent[];
}

const MOCK_EVENTS: NotificationEvent[] = [
  {
    id: "1",
    type: "order",
    title: "New Order",
    message: "Order #ORD-1234 from Nguyễn Văn A",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
  },
  {
    id: "2",
    type: "bid",
    title: "New Bid",
    message: "New bid ₫5,000,000 on Signed Jersey #10",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
  },
  {
    id: "3",
    type: "outbid",
    title: "Outbid Alert",
    message: "You've been outbid on Signed Ball",
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
  },
  {
    id: "4",
    type: "auction_ended",
    title: "Auction Ended",
    message: "Auction for Poster #5 has ended",
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: true,
  },
  {
    id: "5",
    type: "comment",
    title: "New Comment",
    message: "Trần Thị B commented on Product #123",
    timestamp: new Date(Date.now() - 90 * 60 * 1000),
    read: true,
  },
];

const EVENT_ICONS = {
  order: ShoppingCart,
  bid: Gavel,
  outbid: Gavel,
  auction_ended: Clock,
  comment: MessageCircle,
};

const EVENT_COLORS = {
  order: "bg-green-500/10 text-green-500",
  bid: "bg-blue-500/10 text-blue-500",
  outbid: "bg-orange-500/10 text-orange-500",
  auction_ended: "bg-purple-500/10 text-purple-500",
  comment: "bg-zinc-500/10 text-zinc-400",
};

export function RealtimePanel({ isOpen, onClose, events = MOCK_EVENTS }: RealtimePanelProps) {
  const [filter, setFilter] = React.useState<NotificationEvent["type"] | "all">("all");

  const filteredEvents = filter === "all" ? events : events.filter((e) => e.type === filter);

  const handleMarkAsRead = (ids: string[]) => {
    // TODO: Implement mark as read logic
    console.log("Mark as read:", ids);
  };

  const handleMarkAllAsRead = () => {
    handleMarkAsRead(events.map((e) => e.id));
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />}

      {/* Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-96 bg-zinc-950 border-l border-zinc-800 z-50 transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800">
          <h2 className="text-lg font-semibold text-white">Live Activity</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-zinc-800 space-y-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-zinc-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as NotificationEvent["type"] | "all")}
              className="flex-1 h-8 px-2 bg-zinc-900 border border-zinc-800 rounded text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="all">All Events</option>
              <option value="order">Orders</option>
              <option value="bid">Bids</option>
              <option value="outbid">Outbid</option>
              <option value="auction_ended">Auction Ended</option>
              <option value="comment">Comments</option>
            </select>
          </div>
          <button
            onClick={handleMarkAllAsRead}
            className="w-full h-8 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-xs font-medium text-zinc-300 transition-colors"
          >
            Mark All as Read
          </button>
        </div>

        {/* Event List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredEvents.map((event) => {
            const Icon = EVENT_ICONS[event.type];
            const colorClass = EVENT_COLORS[event.type];

            return (
              <div
                key={event.id}
                className={cn(
                  "p-3 rounded-lg border transition-colors cursor-pointer",
                  event.read
                    ? "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900"
                    : "bg-blue-500/5 border-blue-500/20 hover:bg-blue-500/10"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("p-2 rounded-lg flex-shrink-0", colorClass)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{event.title}</h3>
                      {!event.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
                    </div>
                    <p className="text-xs text-zinc-400 mb-2">{event.message}</p>
                    <div className="text-[10px] text-zinc-500">{getRelativeTime(event.timestamp)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

