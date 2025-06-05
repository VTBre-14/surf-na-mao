import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
        <div className="mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-2" />
          <div className="text-center font-semibold text-lg">{session.user.name}</div>
          <div className="text-center text-gray-500 text-sm">{session.user.email}</div>
        </div>
        <div className="mt-6">
          {/* TODO: Add edit profile form */}
          <div className="text-gray-500 text-center">(Edit profile coming soon)</div>
        </div>
      </div>
    </div>
  );
} 