import { z } from 'zod';

export const UpdateContactSchema = z.object({
  fullName: z.string().max(127),
  email: z.string().email('Must be an email').max(127),
  phoneNumber: z
    .string()
    .regex(
      /^\s*(\d{2}|\d{0})[-. ](\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/,
      'Phone Number format must be 12 12345 1234'
    ),
});

export const UpdateClientSchema = UpdateContactSchema.extend({
  password: z.string().max(127)
});

export type tUpdateContactData = z.infer<typeof UpdateContactSchema>;
export type tUpdateClientData = z.infer<typeof UpdateClientSchema>;
