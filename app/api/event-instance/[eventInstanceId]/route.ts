import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { eventInstanceId: string } }
) {
  try {
    const eventInstanceId = (await params).eventInstanceId;
    const response = await fetch(
      `${process.env.API_URL}/workflows/payload/${eventInstanceId}`,
      {
        headers: {
          "x-api-key": process.env.API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching event instance:", error);
    return NextResponse.json(
      { error: "Failed to fetch event instance" },
      { status: 500 }
    );
  }
}
