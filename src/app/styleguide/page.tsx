"use client";
import Section from "@/components/ui/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "@/components/providers/theme-provider";
import { Palette } from "lucide-react";

const accentColors = [
  { name: "Sky Blue", value: "#0EA5E9" },
  { name: "Purple", value: "#7C3AED" },
  { name: "Orange", value: "#F97316" },
  { name: "Pink", value: "#EC4899" },
  { name: "Green", value: "#22C55E" },
  { name: "Red", value: "#EF4444" },
];

export default function StyleguidePage() {
  const { accent, setAccent } = useTheme();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <Section>
        <div className="text-center py-12">
          <Palette className="w-16 h-16 text-accent mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Style Guide</h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto">Design tokens, components và patterns được sử dụng trong SignAuthentics</p>
        </div>
      </Section>

      {/* Accent Colors */}
      <Section title="Accent Colors (Runtime)">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {accentColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setAccent(color.value)}
              className={`group relative rounded-xl overflow-hidden border-2 transition-all ${accent === color.value ? "border-accent scale-105 shadow-lg" : "border-zinc-200 hover:border-zinc-300"}`}
            >
              <div className="aspect-square" style={{ backgroundColor: color.value }} />
              <div className="p-3 bg-white">
                <div className="text-sm font-semibold">{color.name}</div>
                <div className="text-xs text-zinc-500 font-mono">{color.value}</div>
              </div>
              {accent === color.value && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                </div>
              )}
            </button>
          ))}
        </div>
      </Section>

      {/* Brand Colors */}
      <Section title="Brand Colors">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Accent", class: "bg-accent" },
            { name: "Zinc 900", class: "bg-zinc-900" },
            { name: "Zinc 100", class: "bg-zinc-100 border border-zinc-200" },
            { name: "White", class: "bg-white border border-zinc-200" },
          ].map((color) => (
            <div key={color.name} className="text-center">
              <div className={`w-full aspect-square rounded-xl ${color.class} mb-2`} />
              <div className="text-sm font-medium">{color.name}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="space-y-6">
          <div>
            <h1 className="text-5xl font-bold mb-2">Heading 1</h1>
            <code className="text-xs text-zinc-500">text-5xl font-bold</code>
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-2">Heading 2</h2>
            <code className="text-xs text-zinc-500">text-4xl font-bold</code>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Heading 3</h3>
            <code className="text-xs text-zinc-500">text-2xl font-semibold</code>
          </div>
          <div>
            <p className="text-base mb-2">Body text - The quick brown fox jumps over the lazy dog</p>
            <code className="text-xs text-zinc-500">text-base</code>
          </div>
          <div>
            <p className="text-sm text-zinc-600 mb-2">Small text - The quick brown fox jumps over the lazy dog</p>
            <code className="text-xs text-zinc-500">text-sm text-zinc-600</code>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button disabled>Disabled Button</Button>
        </div>
      </Section>

      {/* Chips */}
      <Section title="Chips">
        <div className="flex flex-wrap gap-2">
          <span className="chip">Default Chip</span>
          <span className="chip bg-accent text-white">Accent Chip</span>
          <span className="chip bg-green-500 text-white">Success</span>
          <span className="chip bg-red-500 text-white">Error</span>
          <span className="chip bg-orange-500 text-white">Warning</span>
        </div>
      </Section>

      {/* Cards */}
      <Section title="Cards">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent>
              <h3 className="font-semibold mb-2">Card Title</h3>
              <p className="text-sm text-zinc-600">This is a basic card component with some content inside.</p>
            </CardContent>
          </Card>
          <Card className="border-accent">
            <CardContent>
              <h3 className="font-semibold text-accent mb-2">Accent Card</h3>
              <p className="text-sm text-zinc-600">Card with accent border color.</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-50">
            <CardContent>
              <h3 className="font-semibold mb-2">Muted Card</h3>
              <p className="text-sm text-zinc-600">Card with background color.</p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Grid System */}
      <Section title="Grid System">
        <div className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="col-span-1 bg-accent/10 border border-accent rounded p-2 text-center text-xs font-mono">
                {i + 1}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4 bg-accent/10 border border-accent rounded p-4 text-center text-sm font-mono">col-span-4</div>
            <div className="col-span-8 bg-accent/10 border border-accent rounded p-4 text-center text-sm font-mono">col-span-8</div>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 bg-accent/10 border border-accent rounded p-4 text-center text-sm font-mono">col-span-6</div>
            <div className="col-span-6 bg-accent/10 border border-accent rounded p-4 text-center text-sm font-mono">col-span-6</div>
          </div>
        </div>
      </Section>

      {/* Spacing */}
      <Section title="Spacing Scale">
        <div className="space-y-3">
          {[1, 2, 4, 8, 12, 16, 24, 32].map((space) => (
            <div key={space} className="flex items-center gap-4">
              <div className="w-16 text-sm font-mono text-zinc-600">{space * 4}px</div>
              <div className="h-8 bg-accent rounded" style={{ width: `${space * 4}px` }} />
              <code className="text-xs text-zinc-500">space-{space}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* Border Radius */}
      <Section title="Border Radius">
        <div className="flex flex-wrap gap-4">
          {[
            { name: "rounded", value: "0.25rem" },
            { name: "rounded-lg", value: "0.5rem" },
            { name: "rounded-xl", value: "0.75rem" },
            { name: "rounded-2xl", value: "1rem" },
            { name: "rounded-full", value: "9999px" },
          ].map((radius) => (
            <div key={radius.name} className="text-center">
              <div className={`w-24 h-24 bg-accent ${radius.name} mb-2`} />
              <div className="text-sm font-medium">{radius.name}</div>
              <div className="text-xs text-zinc-500">{radius.value}</div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}


