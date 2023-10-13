import axios from "axios";
import * as Yup from "yup";

export async function sendRegisterData(values) {
  const response = await axios.post(
    `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
    values
  );
  return response;
}

export async function sendLoginData(values) {
  const response = await axios.post(
    `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
    values
  );
  return response;
}

const nameValidation = Yup.string()
  .required("name is required")
  .min(2, "minimum length is 2 characters");

const passValidation = Yup.string()
  .required("password is required")
  .matches(
    /^[\w\s\-@]{0,}$/gm,
    "Name can include capital ketters, small letters, numbers, _ and spaces"
  )
  .min(6, "minimum length is 6 characters");

export const validationSchema = Yup.object({
  name: nameValidation,
  email: Yup.string()
    .email("email is invalid, please enter a valid one eg: example@example.com")
    .required("email is required"),
  password: passValidation,
  age: Yup.number().required("age is required").min(10),
  phone: Yup.string()
    .required("phone is required")
    .matches(
      /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g,
      "enter a valid phone number"
    ),
});
export const loginValidationSchema = Yup.object({
  email: nameValidation,
  password: passValidation,
});
