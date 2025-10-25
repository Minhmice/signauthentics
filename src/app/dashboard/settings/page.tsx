"use client";

/**
 * Settings Page
 * Site, payment, email, security settings management
 */

import * as React from "react";
import { DashboardSectionHeader } from '@/app/dashboard/components/shared/RoleBadge';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Globe, 
  CreditCard, 
  Mail, 
  Shield, 
  Save,
  Upload,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "sonner";

export default function DashboardSettingsPage() {
  const [siteSettings, setSiteSettings] = React.useState({
    siteName: "SignAuthentics",
    siteDescription: "Authentic signed memorabilia from Vietnam's football stars",
    siteUrl: "https://signauthentics.com",
    contactEmail: "contact@signauthentics.com",
    contactPhone: "+84 123 456 789",
    address: "123 Football Street, District 1, Ho Chi Minh City, Vietnam",
  });

  const [paymentSettings, setPaymentSettings] = React.useState({
    currency: "VND",
    bankTransfer: true,
    creditCard: true,
    momo: true,
    zalopay: true,
    paypal: false,
    stripeEnabled: false,
    stripePublicKey: "",
    stripeSecretKey: "",
  });

  const [emailSettings, setEmailSettings] = React.useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "noreply@signauthentics.com",
    fromName: "SignAuthentics",
  });

  const [securitySettings, setSecuritySettings] = React.useState({
    twoFactorEnabled: false,
    sessionTimeout: 30,
    passwordMinLength: 8,
    requireStrongPassword: true,
    loginAttempts: 5,
    lockoutDuration: 15,
  });

  const [showPasswords, setShowPasswords] = React.useState({
    stripeSecret: false,
    smtpPassword: false,
  });

  const handleSave = (section: string) => {
    toast.success(`${section} settings saved successfully`);
  };

  const handleImageUpload = (type: string) => {
    toast.info(`${type} upload functionality coming soon`);
  };

  return (
    <div className="space-y-6">
      <DashboardSectionHeader
        title="Settings"
        description="Manage site configuration, payment methods, email settings, and security"
        visibleFor={["admin"]}
        readOnlyFor={["seller", "editor"]}
        actions={
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save All Changes
          </Button>
        }
      />

      {/* Site Settings */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Globe className="w-5 h-5" />
            Site Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={siteSettings.siteName}
                onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Site URL</Label>
              <Input
                id="siteUrl"
                value={siteSettings.siteUrl}
                onChange={(e) => setSiteSettings({ ...siteSettings, siteUrl: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteDescription">Site Description</Label>
            <Textarea
              id="siteDescription"
              value={siteSettings.siteDescription}
              onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })}
              className="bg-zinc-800 border-zinc-700 text-white"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={siteSettings.contactEmail}
                onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={siteSettings.contactPhone}
                onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={siteSettings.address}
              onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
              className="bg-zinc-800 border-zinc-700 text-white"
              rows={2}
            />
          </div>

          <div className="space-y-4">
            <Label>Site Logo</Label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-zinc-800 border border-zinc-700 rounded-lg flex items-center justify-center">
                <Globe className="w-8 h-8 text-zinc-500" />
              </div>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  onClick={() => handleImageUpload("logo")}
                  className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Logo
                </Button>
                <p className="text-xs text-zinc-500">Recommended: 200x200px, PNG format</p>
              </div>
            </div>
          </div>

          <Button onClick={() => handleSave("Site")} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Site Settings
          </Button>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <CreditCard className="w-5 h-5" />
            Payment Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select
              value={paymentSettings.currency}
              onValueChange={(value) => setPaymentSettings({ ...paymentSettings, currency: value })}
            >
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                <SelectItem value="VND">Vietnamese Dong (VND)</SelectItem>
                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Payment Methods</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="bankTransfer"
                  checked={paymentSettings.bankTransfer}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, bankTransfer: checked })}
                />
                <Label htmlFor="bankTransfer">Bank Transfer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="creditCard"
                  checked={paymentSettings.creditCard}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, creditCard: checked })}
                />
                <Label htmlFor="creditCard">Credit Card</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="momo"
                  checked={paymentSettings.momo}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, momo: checked })}
                />
                <Label htmlFor="momo">MoMo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="zalopay"
                  checked={paymentSettings.zalopay}
                  onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, zalopay: checked })}
                />
                <Label htmlFor="zalopay">ZaloPay</Label>
              </div>
            </div>
          </div>

          <Separator className="bg-zinc-700" />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="stripeEnabled"
                checked={paymentSettings.stripeEnabled}
                onCheckedChange={(checked) => setPaymentSettings({ ...paymentSettings, stripeEnabled: checked })}
              />
              <Label htmlFor="stripeEnabled">Enable Stripe</Label>
            </div>

            {paymentSettings.stripeEnabled && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="stripePublicKey">Stripe Public Key</Label>
                  <Input
                    id="stripePublicKey"
                    value={paymentSettings.stripePublicKey}
                    onChange={(e) => setPaymentSettings({ ...paymentSettings, stripePublicKey: e.target.value })}
                    className="bg-zinc-800 border-zinc-700 text-white"
                    placeholder="pk_test_..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                  <div className="relative">
                    <Input
                      id="stripeSecretKey"
                      type={showPasswords.stripeSecret ? "text" : "password"}
                      value={paymentSettings.stripeSecretKey}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, stripeSecretKey: e.target.value })}
                      className="bg-zinc-800 border-zinc-700 text-white pr-10"
                      placeholder="sk_test_..."
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-zinc-700"
                      onClick={() => setShowPasswords({ ...showPasswords, stripeSecret: !showPasswords.stripeSecret })}
                    >
                      {showPasswords.stripeSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button onClick={() => handleSave("Payment")} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Payment Settings
          </Button>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Mail className="w-5 h-5" />
            Email Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                value={emailSettings.smtpHost}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpHost: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                type="number"
                value={emailSettings.smtpPort}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: parseInt(e.target.value) })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtpUser">SMTP Username</Label>
              <Input
                id="smtpUser"
                value={emailSettings.smtpUser}
                onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <div className="relative">
                <Input
                  id="smtpPassword"
                  type={showPasswords.smtpPassword ? "text" : "password"}
                  value={emailSettings.smtpPassword}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                  className="bg-zinc-800 border-zinc-700 text-white pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-zinc-700"
                  onClick={() => setShowPasswords({ ...showPasswords, smtpPassword: !showPasswords.smtpPassword })}
                >
                  {showPasswords.smtpPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input
                id="fromEmail"
                type="email"
                value={emailSettings.fromEmail}
                onChange={(e) => setEmailSettings({ ...emailSettings, fromEmail: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromName">From Name</Label>
              <Input
                id="fromName"
                value={emailSettings.fromName}
                onChange={(e) => setEmailSettings({ ...emailSettings, fromName: e.target.value })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          <Button onClick={() => handleSave("Email")} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Email Settings
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="twoFactorEnabled"
              checked={securitySettings.twoFactorEnabled}
              onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorEnabled: checked })}
            />
            <Label htmlFor="twoFactorEnabled">Enable Two-Factor Authentication</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: parseInt(e.target.value) })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
              <Input
                id="passwordMinLength"
                type="number"
                value={securitySettings.passwordMinLength}
                onChange={(e) => setSecuritySettings({ ...securitySettings, passwordMinLength: parseInt(e.target.value) })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="requireStrongPassword"
              checked={securitySettings.requireStrongPassword}
              onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, requireStrongPassword: checked })}
            />
            <Label htmlFor="requireStrongPassword">Require Strong Passwords</Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="loginAttempts">Max Login Attempts</Label>
              <Input
                id="loginAttempts"
                type="number"
                value={securitySettings.loginAttempts}
                onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttempts: parseInt(e.target.value) })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lockoutDuration">Lockout Duration (minutes)</Label>
              <Input
                id="lockoutDuration"
                type="number"
                value={securitySettings.lockoutDuration}
                onChange={(e) => setSecuritySettings({ ...securitySettings, lockoutDuration: parseInt(e.target.value) })}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          <Button onClick={() => handleSave("Security")} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Security Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}