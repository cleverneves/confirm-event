import type { PainelEvent } from "../_data-access/get-event";

export function settingsFormKey(event: PainelEvent) {
  return [
    event.pageLayout,
    event.hasIllustration,
    event.maxGuestCapacity ?? "",
    event.confirmationStartsOn ?? "",
    event.confirmationEndsOn ?? "",
  ].join("-");
}
