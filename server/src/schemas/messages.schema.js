import * as yup from "yup";

const deleteMessageSchema = yup.object({
  messageId: yup.string().required(),
});

export { deleteMessageSchema };
