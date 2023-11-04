import { existsSync } from 'fs';
import { resolve } from 'path';

const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;

  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `.env.${env}` : '.env.development';

  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}

export const MessagesHelper = {
  PASSWORD_VALID: 'The password must contain lower case letters, numbers and special characters',
  PASSWORD_OR_EMAIL_INVALID: 'Email and/or password are invalid',
};

export const RegExHelper = {
  password,
};
