import { ResetPasswordContent } from "./_components/content";
import { createClient } from "@/lib/supabase/server";

export default async function ResetPasswordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex flex-1 items-center px-6 py-16">
      <ResetPasswordContent hasSession={Boolean(user)} />
    </main>
  );
}
