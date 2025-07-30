"use client";

import { useMemo } from "react";
import { SidebarBlock } from "@ui/sidebar-block";
import { Spinner } from "@ui/loading/spinner";
import { LoadingContainer } from "@ui/loading/loading-container";
import { useDict } from "@/dictionaries/provider";
import { useEventsData } from "@/hooks/use-events-data";
import type { ExpoEvent } from "@/types";

export const ExpoEvents: React.FC<{ boothId: string }> = ({ boothId }) => {
  const expoEventsText = useDict(
    (state) => state.floormap.sidebar.relateEvents
  );
  const { isFetching, data } = useEventsData({ id: boothId });

  return (
    <SidebarBlock
      className="gap-1"
      title={data && data.length > 0 ? expoEventsText : ""}
    >
      {isFetching ? (
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      ) : (
        data?.map((event) => <Event key={event._id} event={event} />)
      )}
    </SidebarBlock>
  );
};

const Event: React.FC<{ event: ExpoEvent }> = ({ event }) => {
  return (
    <div className="p-2 bg-background/50 border border-foreground/20 rounded-sm flex flex-col gap-1">
      <div className="text-xs">{event.topic}</div>
      <div>{event.title}</div>
      <div className="text-xs flex flex-col gap-1">
        {event.timeList.map((time) => (
          <EventTime key={time._id} time={time} />
        ))}
      </div>
    </div>
  );
};

const dateFormat: Intl.DateTimeFormatOptions = {
  month: "2-digit",
  day: "2-digit",
};
const timeFormat: Intl.DateTimeFormatOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
};

const EventTime: React.FC<{ time: ExpoEvent["timeList"][number] }> = ({
  time,
}) => {
  const { dateText, timeText } = useMemo(() => {
    const { startDate, endDate, startTime, endTime } = {
      startDate: new Date(time.start).toLocaleString("en-CA", dateFormat),
      endDate: new Date(time.end).toLocaleString("en-CA", dateFormat),
      startTime: new Date(time.start).toLocaleTimeString("en-CA", timeFormat),
      endTime: new Date(time.end).toLocaleTimeString("en-CA", timeFormat),
    };
    const dateText =
      startDate === endDate ? startDate : `${startDate}-${endDate}`;
    return { dateText, timeText: `${startTime}-${endTime}` };
  }, [time.start, time.end]);

  return (
    <div key={time._id} className="flex gap-2">
      <div>{dateText}</div>
      <div>{timeText}</div>
    </div>
  );
};
