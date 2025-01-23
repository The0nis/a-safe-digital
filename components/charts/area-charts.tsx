"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const chartData = [
  { date: "2024-04-01", Expenses: 222, Savings: 150 },
  { date: "2024-04-02", Expenses: 97, Savings: 180 },
  { date: "2024-04-03", Expenses: 167, Savings: 120 },
  { date: "2024-04-04", Expenses: 242, Savings: 260 },
  { date: "2024-04-05", Expenses: 373, Savings: 290 },
  { date: "2024-04-06", Expenses: 301, Savings: 340 },
  { date: "2024-04-07", Expenses: 245, Savings: 180 },
  { date: "2024-04-08", Expenses: 409, Savings: 320 },
  { date: "2024-04-09", Expenses: 59, Savings: 110 },
  { date: "2024-04-10", Expenses: 261, Savings: 190 },
  { date: "2024-04-11", Expenses: 327, Savings: 350 },
  { date: "2024-04-12", Expenses: 292, Savings: 210 },
  { date: "2024-04-13", Expenses: 342, Savings: 380 },
  { date: "2024-04-14", Expenses: 137, Savings: 220 },
  { date: "2024-04-15", Expenses: 120, Savings: 170 },
  { date: "2024-04-16", Expenses: 138, Savings: 190 },
  { date: "2024-04-17", Expenses: 446, Savings: 360 },
  { date: "2024-04-18", Expenses: 364, Savings: 410 },
  { date: "2024-04-19", Expenses: 243, Savings: 180 },
  { date: "2024-04-20", Expenses: 89, Savings: 150 },
  { date: "2024-04-21", Expenses: 137, Savings: 200 },
  { date: "2024-04-22", Expenses: 224, Savings: 170 },
  { date: "2024-04-23", Expenses: 138, Savings: 230 },
  { date: "2024-04-24", Expenses: 387, Savings: 290 },
  { date: "2024-04-25", Expenses: 215, Savings: 250 },
  { date: "2024-04-26", Expenses: 75, Savings: 130 },
  { date: "2024-04-27", Expenses: 383, Savings: 420 },
  { date: "2024-04-28", Expenses: 122, Savings: 180 },
  { date: "2024-04-29", Expenses: 315, Savings: 240 },
  { date: "2024-04-30", Expenses: 454, Savings: 380 },
  { date: "2024-05-01", Expenses: 165, Savings: 220 },
  { date: "2024-05-02", Expenses: 293, Savings: 310 },
  { date: "2024-05-03", Expenses: 247, Savings: 190 },
  { date: "2024-05-04", Expenses: 385, Savings: 420 },
  { date: "2024-05-05", Expenses: 481, Savings: 390 },
  { date: "2024-05-06", Expenses: 498, Savings: 520 },
  { date: "2024-05-07", Expenses: 388, Savings: 300 },
  { date: "2024-05-08", Expenses: 149, Savings: 210 },
  { date: "2024-05-09", Expenses: 227, Savings: 180 },
  { date: "2024-05-10", Expenses: 293, Savings: 330 },
  { date: "2024-05-11", Expenses: 335, Savings: 270 },
  { date: "2024-05-12", Expenses: 197, Savings: 240 },
  { date: "2024-05-13", Expenses: 197, Savings: 160 },
  { date: "2024-05-14", Expenses: 448, Savings: 490 },
  { date: "2024-05-15", Expenses: 473, Savings: 380 },
  { date: "2024-05-16", Expenses: 338, Savings: 400 },
  { date: "2024-05-17", Expenses: 499, Savings: 420 },
  { date: "2024-05-18", Expenses: 315, Savings: 350 },
  { date: "2024-05-19", Expenses: 235, Savings: 180 },
  { date: "2024-05-20", Expenses: 177, Savings: 230 },
  { date: "2024-05-21", Expenses: 82, Savings: 140 },
  { date: "2024-05-22", Expenses: 81, Savings: 120 },
  { date: "2024-05-23", Expenses: 252, Savings: 290 },
  { date: "2024-05-24", Expenses: 294, Savings: 220 },
  { date: "2024-05-25", Expenses: 201, Savings: 250 },
  { date: "2024-05-26", Expenses: 213, Savings: 170 },
  { date: "2024-05-27", Expenses: 420, Savings: 460 },
  { date: "2024-05-28", Expenses: 233, Savings: 190 },
  { date: "2024-05-29", Expenses: 78, Savings: 130 },
  { date: "2024-05-30", Expenses: 340, Savings: 280 },
  { date: "2024-05-31", Expenses: 178, Savings: 230 },
  { date: "2024-06-01", Expenses: 178, Savings: 200 },
  { date: "2024-06-02", Expenses: 470, Savings: 410 },
  { date: "2024-06-03", Expenses: 103, Savings: 160 },
  { date: "2024-06-04", Expenses: 439, Savings: 380 },
  { date: "2024-06-05", Expenses: 88, Savings: 140 },
  { date: "2024-06-06", Expenses: 294, Savings: 250 },
  { date: "2024-06-07", Expenses: 323, Savings: 370 },
  { date: "2024-06-08", Expenses: 385, Savings: 320 },
  { date: "2024-06-09", Expenses: 438, Savings: 480 },
  { date: "2024-06-10", Expenses: 155, Savings: 200 },
  { date: "2024-06-11", Expenses: 92, Savings: 150 },
  { date: "2024-06-12", Expenses: 492, Savings: 420 },
  { date: "2024-06-13", Expenses: 81, Savings: 130 },
  { date: "2024-06-14", Expenses: 426, Savings: 380 },
  { date: "2024-06-15", Expenses: 307, Savings: 350 },
  { date: "2024-06-16", Expenses: 371, Savings: 310 },
  { date: "2024-06-17", Expenses: 475, Savings: 520 },
  { date: "2024-06-18", Expenses: 107, Savings: 170 },
  { date: "2024-06-19", Expenses: 341, Savings: 290 },
  { date: "2024-06-20", Expenses: 408, Savings: 450 },
  { date: "2024-06-21", Expenses: 169, Savings: 210 },
  { date: "2024-06-22", Expenses: 317, Savings: 270 },
  { date: "2024-06-23", Expenses: 480, Savings: 530 },
  { date: "2024-06-24", Expenses: 132, Savings: 180 },
  { date: "2024-06-25", Expenses: 141, Savings: 190 },
  { date: "2024-06-26", Expenses: 434, Savings: 380 },
  { date: "2024-06-27", Expenses: 448, Savings: 490 },
  { date: "2024-06-28", Expenses: 149, Savings: 200 },
  { date: "2024-06-29", Expenses: 103, Savings: 160 },
  { date: "2024-06-30", Expenses: 446, Savings: 400 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-1))",
  },
  Savings: {
    label: "Savings",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaCharts() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Anaytics</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl bg-background shadow-lg">
            <SelectItem
              value="90d"
              className="rounded-lg cursor-pointer hover:bg-accent hover:text-foreground"
            >
              Last 3 months
            </SelectItem>
            <SelectItem
              value="30d"
              className="rounded-lg cursor-pointer hover:bg-accent hover:text-foreground"
            >
              Last 30 days
            </SelectItem>
            <SelectItem
              value="7d"
              className="rounded-lg cursor-pointer hover:bg-accent hover:text-foreground"
            >
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Expenses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Expenses)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSavings" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-Savings)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-Savings)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="Savings"
              type="natural"
              fill="url(#fillSavings)"
              stroke="var(--color-Savings)"
              stackId="a"
            />
            <Area
              dataKey="Expenses"
              type="natural"
              fill="url(#fillExpenses)"
              stroke="var(--color-Expenses)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
