"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ImageOffIcon } from "lucide-react";

import {
  illustrationAspect,
  type EventPageLayout,
  type IllustrationAspect,
} from "@/lib/event-illustration";
import { cn } from "@/lib/utils";

const aspectClassName: Record<IllustrationAspect, string> = {
  banner: "aspect-[4/1]",
  portrait: "aspect-[700/923]",
};

function listThumbnailWidthClass(pageLayout: EventPageLayout) {
  return pageLayout === "image_only" ? "w-9" : "w-24";
}

function EventListThumbnailPlaceholder({
  pageLayout,
}: {
  pageLayout: EventPageLayout;
}) {
  const aspect = illustrationAspect(pageLayout);

  return (
    <div
      className={cn(
        aspectClassName[aspect],
        listThumbnailWidthClass(pageLayout),
        "flex shrink-0 items-center justify-center rounded-sm bg-muted"
      )}
      aria-hidden="true"
    >
      <ImageOffIcon className="size-4 text-muted-foreground" />
    </div>
  );
}

export function EventListThumbnail({
  imageUrl,
  pageLayout,
}: {
  imageUrl: string | null;
  pageLayout: EventPageLayout;
}) {
  const aspect = illustrationAspect(pageLayout);
  const [hasImageFailed, setHasImageFailed] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageError = useCallback(() => setHasImageFailed(true), []);

  const [trackedUrl, setTrackedUrl] = useState(imageUrl);
  if (trackedUrl !== imageUrl) {
    setTrackedUrl(imageUrl);
    setHasImageFailed(false);
  }

  useEffect(() => {
    const image = imageRef.current;

    if (image?.complete && image.naturalWidth === 0) {
      setHasImageFailed(true);
    }
  }, [imageUrl]);

  if (!imageUrl || hasImageFailed) {
    return <EventListThumbnailPlaceholder pageLayout={pageLayout} />;
  }

  return (
    <div
      className={cn(
        aspectClassName[aspect],
        listThumbnailWidthClass(pageLayout),
        "shrink-0 overflow-hidden rounded-sm"
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={imageUrl}
        alt=""
        className="size-full object-fill"
        onError={handleImageError}
      />
    </div>
  );
}
