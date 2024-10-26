import { useRouter } from "next/navigation";
import { useSession } from "@/app/_components/providers/session-provider";
import { useEffect } from "react";

export const ValidateClientProtectedRoute = () => {
  const router = useRouter();
  const { user, session } = useSession();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  return { user, session };
};

export const ValidateAdminInClient = () => {
  const router = useRouter();
  const { user } = useSession();

  useEffect(() => {
    if (user && user.role !== "ADMIN") {
      router.push("/");
    }
  }, [user, router]);

  return { user };
};
