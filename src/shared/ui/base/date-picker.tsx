"use client";

import * as React from "react";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { CalendarIcon } from "lucide-react";
import { format, Locale } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/shared/lib/shadcn/tw-merge";
import { Formatters } from "react-day-picker";

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  dateFormat?: string;
  locale?: Locale;
  formatters?: Partial<Formatters>;
}

export function DatePicker({
  value,
  onChange,
  placeholder,
  dateFormat = "dd-MM-yyyy",
  locale,
  disabled = false,
  className,
  formatters,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, dateFormat, { locale }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          locale={locale}
          captionLayout="dropdown"
          fromYear={1900}
          toYear={new Date().getFullYear()}
          defaultMonth={value || new Date(2000, 0)}
          weekStartsOn={1}
          className="[--cell-size:2.75rem]"
          classNames={{
            weekdays: "hidden",
            nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1 px-1",
            month_caption:
              "flex h-[--cell-size] w-full items-center justify-center px-0",
            dropdowns:
              "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium px-10",
          }}
          formatters={formatters}
        />
      </PopoverContent>
    </Popover>
  );
}
