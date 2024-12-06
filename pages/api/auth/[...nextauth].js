// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
      
          const user = await res.json();
      
          console.log('Response from backend:', user); // Логируем ответ
      
          if (res.ok && user && user.access_token) {
            return user; // Возвращаем данные пользователя с access_token
          }
      
          return null;
        } catch (err) {
          console.error('Error during authentication:', err);
          return null;
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 дней
    updateAge: 24 * 60 * 60, // Обновление токена раз в сутки
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // Отключено для разработки
      },
    },
  },
  callbacks: {
    callbacks: {
        async jwt(token, user) {
          if (user) {
            token.accessToken = user.access_token;  // сохраняем access_token в токене
            token.user = user; // сохраняем данные пользователя
          }
          return token;
        },
        async session(session, token) {
          session.accessToken = token.accessToken;  // сохраняем токен сессии
          session.user = token.user; // сохраняем данные пользователя
          return session;
        }
      }
  }
});