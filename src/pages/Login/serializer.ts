import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Must be an email').max(127),
  password: z.string().max(127).nonempty('Password required'),
});

export const RegisterSchema = LoginSchema.extend({
  fullName: z.string().max(127),
  phoneNumber: z
    .string()
    .regex(
      /^\s*(\d{2}|\d{0})[-. ](\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/,
      'Phone Number format must be 12 12345 1234'
    ),
});

export type tLoginData = z.infer<typeof LoginSchema>;
export type tRegisterData = z.infer<typeof RegisterSchema>;