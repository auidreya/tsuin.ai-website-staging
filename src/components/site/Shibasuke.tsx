import { useTheme } from "@/lib/theme";

type Pose = "mascot" | "cookie" | "running" | "rofl" | "ball" | "snack" | "stretching" | "sleep";

interface ShibasukeProps {
  pose: Pose;
  size?: number;
  className?: string;
  alt?: string;
}

export function Shibasuke({ pose, size = 120, className = "", alt = "Shibasuke" }: ShibasukeProps) {
  const { theme } = useTheme();
  // Swapped: dark mascot shown in light mode, light mascot shown in dark mode
  const variant = theme === "dark" ? "light" : "dark";

  // sleep only exists in dark variant
  const resolvedPose = pose === "sleep" && variant === "light" ? "snack" : pose;

  return (
    <img
      src={`/mascot/shibasuke-${variant}-${resolvedPose}.svg`}
      alt={alt}
      width={size}
      height={size}
      className={`select-none pointer-events-none ${className}`}
      draggable={false}
    />
  );
}
