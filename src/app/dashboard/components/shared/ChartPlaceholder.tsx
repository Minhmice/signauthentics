/**
 * Chart Placeholder Component
 * Mock chart với gradient và animation
 */

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface ChartPlaceholderProps {
  title?: string;
  description?: string;
  height?: number;
  data?: number[];
}

export function ChartPlaceholder({ 
  title = "Revenue Chart", 
  description = "Last 30 days trend",
  height = 256,
  data = [45, 52, 48, 65, 72, 68, 85, 90, 78, 95, 88, 100, 92, 105, 98, 112, 108, 125, 118, 135, 128, 142, 138, 155, 148, 165, 158, 175, 168, 182]
}: ChartPlaceholderProps) {
  const max = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value / max) * 80;
    return `${x},${y}`;
  }).join(" ");

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white mb-1">{title}</h3>
          <p className="text-xs text-zinc-500">{description}</p>
        </div>
        <div style={{ height }} className="relative">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="100"
                y2={y}
                stroke="rgb(63 63 70)"
                strokeWidth="0.2"
                strokeDasharray="2,2"
              />
            ))}
            
            {/* Area gradient */}
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="rgb(59 130 246)" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            
            {/* Area */}
            <polygon
              points={`0,100 ${points} 100,100`}
              fill="url(#chartGradient)"
            />
            
            {/* Line */}
            <polyline
              points={points}
              fill="none"
              stroke="rgb(59 130 246)"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Dots */}
            {data.map((value, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - (value / max) * 80;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="0.8"
                  fill="rgb(59 130 246)"
                  className="opacity-0 hover:opacity-100 transition-opacity"
                />
              );
            })}
          </svg>
          
          {/* Trend indicator */}
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 bg-green-500/10 rounded">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-xs font-semibold text-green-500">+24%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Mini Chart Sparkline
 * Biểu đồ nhỏ cho KPI cards
 */
interface SparklineProps {
  data: number[];
  color?: string;
}

export function Sparkline({ data, color = "rgb(59 130 246)" }: SparklineProps) {
  const max = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value / max) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg className="w-full h-8" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      />
    </svg>
  );
}

