import { NextResponse } from "next/server";

import { decodeIllustrationFromDb } from "@/lib/event-illustration-server";
import { detectIllustrationContentType } from "@/lib/event-illustration";
import { requireOrganizer } from "@/lib/auth/require-organizer";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  if (!UUID_RE.test(userId)) {
    return notFoundImage();
  }

  const { supabase } = await requireOrganizer();
  const { data, error } = await supabase.rpc("organizer_profile_image", {
    p_user_id: userId,
  });

  if (error || !data?.length) {
    return notFoundImage();
  }

  const row = data[0];
  const bytes = decodeIllustrationFromDb(row.image);
  const contentType = bytes ? detectIllustrationContentType(bytes) : null;

  if (!bytes || !contentType || contentType !== row.content_type) {
    return notFoundImage();
  }

  return new NextResponse(new Uint8Array(bytes), {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "private, max-age=3600",
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
