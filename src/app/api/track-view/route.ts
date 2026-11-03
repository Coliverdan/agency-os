import { NextRequest, NextResponse } from "next/server";

// Cache in-memory for server telemetry hits during runtime
const serverTelemetryEvents: Record<string, { lastViewed: string; count: number }> = {};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const site = searchParams.get("site") || searchParams.get("slug") || "unknown";

  const now = new Date().toISOString();
  if (!serverTelemetryEvents[site]) {
    serverTelemetryEvents[site] = { lastViewed: now, count: 1 };
  } else {
    serverTelemetryEvents[site].lastViewed = now;
    serverTelemetryEvents[site].count += 1;
  }

  return NextResponse.json({
    success: true,
    site,
    timestamp: now,
    count: serverTelemetryEvents[site].count,
  });
}

export async function POST(request: NextRequest) {
  let site = "unknown";
  try {
    const { searchParams } = new URL(request.url);
    const paramSite = searchParams.get("site") || searchParams.get("slug");
    if (paramSite) {
      site = paramSite;
    } else {
      const body = await request.json();
      site = body.site || body.slug || "unknown";
    }
  } catch (e) {
    // fallback if no body
  }

  const now = new Date().toISOString();
  if (!serverTelemetryEvents[site]) {
    serverTelemetryEvents[site] = { lastViewed: now, count: 1 };
  } else {
    serverTelemetryEvents[site].lastViewed = now;
    serverTelemetryEvents[site].count += 1;
  }

  return NextResponse.json({
    success: true,
    site,
    timestamp: now,
    count: serverTelemetryEvents[site].count,
  });
}
