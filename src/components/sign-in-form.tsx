"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const clear = () => {
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError("Invalid credentials");
        return;
      }

      router.replace("/dashboard");

    } catch (error) {
      console.log("Sign in error", error);

      setError("Something went wrong");
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400 bg-zinc-300/10">
        <h1 className="text-xl font-bold my-4">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clear();
            }}
            type="text"
            placeholder="E-mail"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassowrd(e.target.value);
              clear();
            }}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2 rounded-md">
            Sign in
          </button>

          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounden-md mt-2 rounded-md">
              {error}
            </div>
          )}

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
