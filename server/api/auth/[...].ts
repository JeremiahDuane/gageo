import { NuxtAuthHandler } from '#auth';
import GoogleProvider from 'next-auth/providers/google';

const config = useRuntimeConfig();

export default NuxtAuthHandler({
  secret: config.authSecret,
  providers: [
    GoogleProvider.default({
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
    }),
  ],
});
