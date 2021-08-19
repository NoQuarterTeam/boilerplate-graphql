import * as yup from "yup"

yup.addMethod<yup.StringSchema<string | null | undefined>>(yup.string, "nullIfEmpty", function () {
  return this.transform((val, origVal) => {
    return origVal.trim() === "" ? undefined : val
  }).nullable()
})

yup.addMethod<yup.NumberSchema<number | undefined | null>>(yup.number, "nullIfEmpty", function () {
  return this.transform((val, origVal) => (origVal === "" ? null : val)).nullable()
})

export const Yup = yup
