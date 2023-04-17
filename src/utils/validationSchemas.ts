import { z } from "zod";

const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

export const AuthSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required!" })
      .email("Please provide valid email!")
      .nonempty({ message: "Email is required!" }),
    password: z
      .string({ required_error: "Password is required!" })
      .regex(
        passRegex,
        "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!"
      ),
  })
  .required()
  .strict();
