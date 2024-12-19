import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@/models/user';
import { connectToDB } from '@/utils/database';

const generateValidUsername = (name, email) => {
  // Remove invalid characters and limit to 20 characters
  let username = name.replace(/[^a-zA-Z0-9._]/g, '').toLowerCase();
  username = username.substring(0, 20);

  // Ensure it meets the minimum length requirement
  if (username.length < 8) {
    username = email.split('@')[0].toLowerCase().substring(0, 20);
  }

  // Fallback for edge cases
  if (username.length < 8) {
    username = `user_${Date.now()}`;
  }

  return username;
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ account, profile }) {
      try {
        await connectToDB();

        // Check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // If not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: generateValidUsername(profile.name, profile.email),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking or creating user:", error.message);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };
