"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useParams } from "next/navigation";
import { useEffect } from "react";

const useAnalytics = () => {
  const { eventInstanceId } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const sendAnalytics = async () => {
      try {
        await fetch(
          `${
            process.env.NEXT_PUBLIC_BASE_URL || ""
          }/api/event-analytics/initiate/${eventInstanceId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            signal,
          }
        );
      } catch (error: any) {
        // Ignore abort errors
        if (error.name === "AbortError") {
          return;
        }
        throw new Error("Error sending analytics:", error);
      }
    };

    sendAnalytics();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [eventInstanceId]);
};

export default useAnalytics;
