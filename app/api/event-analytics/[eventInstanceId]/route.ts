import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ eventInstanceId: string }> }
) {
  try {
    const eventInstanceId = (await params).eventInstanceId;
    const body = await request.json();

    const response = await fetch(
      `${process.env.API_URL}/event-analytics/${eventInstanceId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY || "",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update analytics: ${response.statusText}`);
    }

    return NextResponse.json({});
  } catch (error) {
    console.error("Error updating analytics:", error);
    return NextResponse.json(
      { error: "Failed to update analytics" },
      { status: 500 }
    );
  }
}
