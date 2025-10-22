"use client";

/**
 * Settings Page
 * Wireframe cho cấu hình hệ thống
 * Admin: Full, Others: Read-only hoặc Hidden
 */

import { DashboardSectionHeader } from "@/components/dashboard/RoleBadge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Globe, DollarSign, Truck, CreditCard, Shield, Mail } from "lucide-react";

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Settings"
        description="Cấu hình hệ thống - Domain: admin.signauthentics.vn"
        visibleFor={["admin"]}
        readOnlyFor={["seller", "customer"]}
      />

      {/* Domain Information */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Domain & Infrastructure</h2>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-white mb-1">Admin Domain</div>
                  <div className="text-xs text-zinc-400">admin.signauthentics.vn</div>
                </div>
                <div className="px-3 py-1 bg-green-500/10 text-green-500 text-xs rounded-full">Active</div>
              </div>
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <p className="text-xs text-blue-400">
                  <strong>Cloudflare Tunnel:</strong> Kết nối an toàn không mở cổng, traffic được định tuyến qua Cloudflare
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locale & Currency */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Locale & Currency</h2>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <Globe className="w-4 h-4" />
                  Language
                </label>
                <select className="w-full h-10 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="vn">Vietnamese (VN)</option>
                  <option value="en">English (EN)</option>
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-3">
                  <DollarSign className="w-4 h-4" />
                  Currency Display
                </label>
                <select className="w-full h-10 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                  <option value="vnd">VND (₫)</option>
                  <option value="eur">EUR (€)</option>
                </select>
                <p className="text-xs text-zinc-500 mt-1">Hiển thị snapshot, không thay đổi giá thực</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Providers */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Payment Providers</h2>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="space-y-3">
              {["Momo", "ZaloPay", "VNPay", "Stripe"].map((provider) => (
                <div key={provider} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-zinc-400" />
                    <span className="text-sm font-medium text-white">{provider}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={provider !== "Stripe"} />
                    <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shipping Providers */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Shipping Providers</h2>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="space-y-3">
              {[
                { name: "GHN", tracking: "https://ghn.vn/tracking/{code}" },
                { name: "GHTK", tracking: "https://ghtk.vn/track/{code}" },
                { name: "VNPost", tracking: "https://vnpost.vn/track/{code}" },
                { name: "J&T Express", tracking: "https://jtexpress.vn/track/{code}" },
              ].map((provider) => (
                <div key={provider.name} className="p-4 bg-zinc-800/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-zinc-400" />
                      <span className="text-sm font-medium text-white">{provider.name}</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">{provider.tracking}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-4">Security & Access</h2>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="p-4 bg-zinc-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-white">API Tokens</span>
                </div>
                <p className="text-xs text-zinc-500">Quản lý API keys cho third-party integrations</p>
                <Button size="sm" variant="outline" className="mt-3 bg-zinc-800 border-zinc-700 text-zinc-300">
                  Manage Tokens
                </Button>
              </div>
              <div className="p-4 bg-zinc-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-white">Email Templates</span>
                </div>
                <p className="text-xs text-zinc-500">Customize email notifications (orders, auctions, etc.)</p>
                <Button size="sm" variant="outline" className="mt-3 bg-zinc-800 border-zinc-700 text-zinc-300">
                  Edit Templates
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}

