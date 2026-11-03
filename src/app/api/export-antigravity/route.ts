import { NextRequest, NextResponse } from "next/server";
import { INITIAL_BUSINESSES } from "@/lib/mock-data";
import { generateAntigravityJson } from "@/lib/crm-store";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const id = searchParams.get("id");

  const business = INITIAL_BUSINESSES.find(
    (b) => (slug && b.slug === slug) || (id && b.id === id)
  );

  if (!business) {
    return NextResponse.json({ error: "Commerce introuvable" }, { status: 404 });
  }

  const jsonPayload = generateAntigravityJson(business);
  const fileName = `data-${business.slug}.json`;

  return new NextResponse(JSON.stringify(jsonPayload, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="${fileName}"`,
    },
  });
}
