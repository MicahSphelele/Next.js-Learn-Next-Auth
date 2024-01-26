"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AuthStatus } from "../../domain/enums/enums";
import { SessionUser } from "../../domain/models/session/session-user";

const UserInfoView = () => {
  const { data: session, status } = useSession();

  const [isMounted, setIsMounted] = useState(false);

  const user = session?.user as SessionUser;

  const accountCreationDate = new Date(user?.createdAt);

  const router = useRouter();

  useEffect(() => {
    if (status !== AuthStatus.Loading) {
      if (status === AuthStatus.Unauthenticated) {
        router.replace("/");
      }
    }

    if (!isMounted) {
      setIsMounted(true);
    }
  }, [status, isMounted, router]);

  if (!isMounted) {
    return null;
  }

  return (
    session && (
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
          <div>
            Name: <span className="font-bold">{ user?.name }</span>
          </div>
          <div>
            E-mail: <span className="font-bold">{ user?.email }</span>
          </div>
          <div>
            Account Creation: <span className="font-bold">{ accountCreationDate.toDateString() }</span>
          </div>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white font-bold py-2 px-6 mt-3"
          >
            Sign out
          </button>
        </div>
      </div>
    )
  );
};

export default UserInfoView;
