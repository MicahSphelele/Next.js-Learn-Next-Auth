"use client";

import Link from "next/link";

const SignInForm = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Sign in</h1>
        <form className="flex flex-col gap-3">
          <input type="text" placeholder="E-mail" />
          <input type="password" placeholder="Password" />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md">
            Sign in
          </button>

          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounden-md mt-2 rounded-md">
            Error message
          </div>
          <Link className="text-sm mt-3 text-right" href={"/sign-up"} replace>
            Do not have an account?{" "}
            <span className="underline font-semibold">Sign up</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
