import vine from "@vinejs/vine";

export const uiSchema = vine.object({
  title: vine.string().minLength(15).maxLength(50),
  description: vine.string().minLength(20).maxLength(5000),
  user_id: vine.string(),
  image: vine.string(),
});
