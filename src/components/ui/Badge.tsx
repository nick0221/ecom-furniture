import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "accent";
  size?: "sm" | "md";
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        {
          "bg-surface-dark text-primary": variant === "default",
          "bg-green-100 text-success": variant === "success",
          "bg-amber-100 text-warning": variant === "warning",
          "bg-red-100 text-danger": variant === "danger",
          "bg-accent/20 text-accent-dark": variant === "accent",
        },
        {
          "px-2 py-0.5 text-xs": size === "sm",
          "px-3 py-1 text-sm": size === "md",
        }
      )}
    >
      {children}
    </span>
  );
}
