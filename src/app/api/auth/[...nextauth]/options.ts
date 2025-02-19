import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

import GoogleProvider from "next-auth/providers/google";

const clientId = process.env.GITHUB_ID;
const clientSecret = process.env.GITHUB_SECRET;

const facebookId = process.env.FACEBOOK_ID;
const facebookSecret = process.env.FACEBOOK_SECRET;

const googleID = process.env.GOOGLE_ID2;
const googleSecret = process.env.GOOGLE_SECRET;
if (!clientId || !clientSecret) {
  throw new Error("No client id or client secret in env file");
}
if (!facebookId || !facebookSecret) {
  throw new Error("No Facebook client id or client secret in env file");
}
if (!googleID || !googleSecret) {
  throw new Error("No Facebook client id or client secret in env file");
}
export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
    FacebookProvider({
      clientId: facebookId,
      clientSecret: facebookSecret,
    }),
    GoogleProvider({
      clientId: googleID,
      clientSecret: googleSecret,
    }),
  ],
};
