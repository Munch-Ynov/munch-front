import { icons } from "lucide-react";
import Icon from "../ui/icon";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface KpiProps {
  title: string;
  value: number;
  icon: keyof typeof icons;
  subtitle?: string;
  isLoading?: boolean;
}

export const CardKPI = ({
  title,
  value,
  icon,
  subtitle,
  isLoading,
}: KpiProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 gap-4">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon name={icon} className="w-4 h-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoading ? (
            <span className="animate-pulse">
              <span className="bg-gray-200 text-gray-200 rounded-full">0</span>
            </span>
          ) : (
            <span>{value}</span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardContent>
    </Card>
  );
};
