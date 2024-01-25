"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const UserInfoView = () => {

    const router = useRouter();

    const { data: session } = useSession();

    useEffect(() => {

        if(!session) {
            router.replace("/");
            return
        }

    }, [session, router]);

  return session && (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          E-mail: <span className="font-bold">{session?.user?.email}</span>
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
};

export default UserInfoView;
