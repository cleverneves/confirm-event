import { ProfileContent } from "./_components/content";
import { getProfile } from "./_data-access/get-profile";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <ProfileContent
      email={profile.email}
      fields={profile.fields}
      loadError={profile.error}
    />
  );
}
