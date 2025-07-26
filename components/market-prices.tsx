"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/language-provider";
import { TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { marketData } from "@/lib/market-data";
import OnlineSalesPage from "@/app/online-sell/page";

export function MarketPrices() {
  const { language } = useLanguage();
  const [prices, setPrices] = useState(marketData[language]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const content = {
    en: {
      title: "Market Prices",
      description: "Current market prices for major crops",
      lastUpdated: "Last updated",
      refresh: "Refresh Prices",
      pricePerKg: "per kg",
      change: "Change",
      trend: {
        up: "Increasing",
        down: "Decreasing",
        stable: "Stable",
      },
    },
    uz: {
      title: "Bozor narxlari",
      description: "Asosiy ekinlar uchun joriy bozor narxlari",
      lastUpdated: "Oxirgi yangilanish",
      refresh: "Narxlarni yangilash",
      pricePerKg: "kg uchun",
      change: "O'zgarish",
      trend: {
        up: "Oshmoqda",
        down: "Kamaymoqda",
        stable: "Barqaror",
      },
    },
  };

  const t = content[language];

  const refreshPrices = () => {
    // Simulate price updates with small random changes
    const updatedPrices = prices.map((item) => {
      const changePercent = (Math.random() - 0.5) * 10; // -5% to +5%
      const newPrice = Math.max(0.1, item.price * (1 + changePercent / 100));
      const priceDiff = newPrice - item.price;

      let trend: "up" | "down" | "stable" = "stable";
      if (Math.abs(priceDiff) > 0.05) {
        trend = priceDiff > 0 ? "up" : "down";
      }

      return {
        ...item,
        price: Math.round(newPrice * 100) / 100,
        change: Math.round(priceDiff * 100) / 100,
        trend,
      };
    });

    setPrices(updatedPrices);
    setLastUpdated(new Date());
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "down":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div>
      <OnlineSalesPage/>
      <div className="space-y-6 mt-10">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {t.title}
                </CardTitle>
                <CardDescription>
                  {t.description} • {t.lastUpdated}:{" "}
                  {lastUpdated.toLocaleTimeString()}
                </CardDescription>
              </div>
              <Button onClick={refreshPrices} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                {t.refresh}
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prices.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {item.category}
                      </CardDescription>
                    </div>
                  </div>
                  {getTrendIcon(item.trend)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(item.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {t.pricePerKg}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge className={getTrendColor(item.trend)}>
                      {t.trend[item.trend as keyof typeof t.trend]}
                    </Badge>
                    <div
                      className={`text-sm font-medium ${
                        item.change > 0
                          ? "text-green-600"
                          : item.change < 0
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {item.change > 0 ? "+" : ""}
                      {formatCurrency(item.change)}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {t.change}: {item.change > 0 ? "+" : ""}
                    {((item.change / (item.price - item.change)) * 100).toFixed(
                      1
                    )}
                    %
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
    </div>
  );
}
