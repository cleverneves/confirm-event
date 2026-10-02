import { NextResponse } from "next/server";

import { decodeIllustrationFromDb } from "@/lib/event-illustration-server";
import { detectIllustrationContentType } from "@/lib/event-illustration";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("event_slugs")
    .select("events(illustration, illustration_content_type)")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data?.events) {
    return notFoundImage();
  }

  const event = Array.isArray(data.events) ? data.events[0] : data.events;

  if (!event?.illustration || !event.illustration_content_type) {
    return notFoundImage();
  }

  const bytes = decodeIllustrationFromDb(event.illustration);
  const contentType = bytes ? detectIllustrationContentType(bytes) : null;

  if (!bytes || !contentType || contentType !== event.illustration_content_type) {
    return notFoundImage();
  }

  return new NextResponse(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}

function notFoundImage() {
  return new NextResponse(null, {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
