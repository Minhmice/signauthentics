import * as React from "react";

type SectionProps = React.PropsWithChildren<{
  title?: string;
  subtitle?: string;
  className?: string;
  container?: boolean;
  titleAlign?: "left" | "center";
}>;

export function Section({ title, subtitle, className, container = true, titleAlign = "left", children }: SectionProps) {
  return (
    <section className={["py-8 md:py-12", className].filter(Boolean).join(" ")}>
      <div className={container ? "max-w-screen-2xl mx-auto px-4 md:px-6" : undefined}>
        {title && (
          <div className={`mb-6 ${titleAlign === "center" ? "text-center" : ""}`}>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-sm md:text-base text-zinc-600 dark:text-zinc-400">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

export default Section;


