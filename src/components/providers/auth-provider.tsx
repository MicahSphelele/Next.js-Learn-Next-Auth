"use client";

import { SessionProvider } from "next-auth/react";

import { useState, useEffect } from "react";

import { ThemeProvider } from "next-themes";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </SessionProvider>
  );
};

export default AuthProvider;
