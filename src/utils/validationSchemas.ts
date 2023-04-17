import { z } from "zod";

const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

export const LogSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required!" })
      .email("Please provide valid email!")
      .nonempty({ message: "Email is required!" }),
    password: z.string({ required_error: "Password is required!" }),
  })
  .required()
  .strict();

export const RegSchema = z
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

export const NewTaskSchema = z
  .object({
    task_message: z
      .string({ required_error: "Task Message is required!" })
      .nonempty({ message: "Task Message is required!" }),
  })
  .required();

export const UpdateTaskSchema = z
  .object({
    task_message: z
      .string({ required_error: "Task Message is required!" })
      .nonempty({ message: "Task Message is required!" }),
    status: z
      .string({ required_error: "Status is required!" })
      .nonempty({ message: "Status is required!" }),
  })
  .required();

export const DeleteTaskSchema = z.object({
  id: z
    .string({ required_error: "Id is required!" })
    .nonempty({ message: "Id is required!" }),
});

export const FileSchema = z.object({
  filename: z
    .string({ required_error: "FileName is required!" })
    .nonempty({ message: "FileName is required!" }),
});