import vine from "@vinejs/vine";

export const registerSchema = vine.object({
  name: vine.string().minLength(2).maxLength(50),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(32).confirmed(),
});

export const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});
