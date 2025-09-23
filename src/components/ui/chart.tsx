import * as React from "react";
import { cn } from "@/lib/utils";

// Simple chart container
const Chart = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props} />
));
Chart.displayName = "Chart";

// Chart title
const ChartTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
ChartTitle.displayName = "ChartTitle";

// Chart description  
const ChartDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ChartDescription.displayName = "ChartDescription";

// Chart content container
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    config?: Record<string, any>;
  }
>(({ className, config, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full h-[200px] min-h-[200px]", className)}
    {...props}
  />
));
ChartContainer.displayName = "ChartContainer";

// Simple tooltip placeholder
const ChartTooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-background p-2 shadow-md",
      className
    )}
    {...props}
  />
));
ChartTooltip.displayName = "ChartTooltip";

// Tooltip content
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm", className)}
    {...props}
  />
));
ChartTooltipContent.displayName = "ChartTooltipContent";

// Chart legend
const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-center gap-4 text-sm", className)}
    {...props}
  />
));
ChartLegend.displayName = "ChartLegend";

// Legend content
const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
ChartLegendContent.displayName = "ChartLegendContent";

export {
  Chart,
  ChartTitle,
  ChartDescription,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
};