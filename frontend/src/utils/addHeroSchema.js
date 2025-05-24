import * as yup from "yup";

export const schema = yup.object().shape({
  nickname: yup.string().required("Nickname is required"),
  real_name: yup.string().nullable(),
  origin_description: yup.string().nullable(),
  superpowers: yup.string().nullable(),
  catch_phrase: yup.string().nullable(),
  images: yup.array(),
});
