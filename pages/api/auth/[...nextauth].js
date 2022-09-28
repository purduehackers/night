import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-private,user-read-email,user-read-currently-playing,user-read-playback-state'
    })
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token
      }
      return token
    }
  }
}
export default NextAuth(authOptions)
