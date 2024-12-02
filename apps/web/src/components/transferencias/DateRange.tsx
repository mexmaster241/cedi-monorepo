"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { DateRange } from "react-day-picker"
import { es } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateTimeRangeProps extends React.HTMLAttributes<HTMLDivElement> {
  onRangeChange?: (range: { dates: DateRange; times: { from: string; to: string } }) => void;
}

export const DateTimeRange = React.forwardRef<{ reset: () => void }, DateTimeRangeProps>(
  ({ className, onRangeChange }, ref) => {
    const [date, setDate] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 7),
    })
    const [timeFrom, setTimeFrom] = React.useState("00:00")
    const [timeTo, setTimeTo] = React.useState("23:59")

    React.useEffect(() => {
      onRangeChange?.({
        dates: date ?? { from: undefined, to: undefined },
        times: { from: timeFrom, to: timeTo }
      })
    }, [date, timeFrom, timeTo, onRangeChange])

    React.useImperativeHandle(ref, () => ({
      reset: () => {
        setDate(undefined)
        setTimeFrom("00:00")
        setTimeTo("23:59")
      }
    }))

    return (
      <div className={cn("font-clash-display flex flex-col gap-2", className)}>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-[300px] justify-start text-left font-clash-display",
                  !date && "text-muted-foreground font-clash-display"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd MMM yyyy", { locale: es })} -{" "}
                      {format(date.to, "dd MMM yyyy", { locale: es })}
                    </>
                  ) : (
                    format(date.from, "dd MMM yyyy", { locale: es })
                  )
                ) : (
                  <span>Seleccionar fechas</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                className="font-clash-display"
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                locale={es}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex gap-2 items-center">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Input
            type="time"
            value={timeFrom}
            onChange={(e) => setTimeFrom(e.target.value)}
            className="w-[140px]"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="time"
            value={timeTo}
            onChange={(e) => setTimeTo(e.target.value)}
            className="w-[140px]"
          />
        </div>
      </div>
    )
  }
)

DateTimeRange.displayName = "DateTimeRange"
