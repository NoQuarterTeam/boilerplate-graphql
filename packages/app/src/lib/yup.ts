import * as Yup from "yup"

Yup.addMethod(Yup.string, "nullIfEmpty", function () {
  return this.transform((val, origVal) => (origVal.trim() === "" ? null : val)).nullable()
})

Yup.addMethod(Yup.number, "nullIfEmpty", function () {
  return this.transform((val, origVal) => (origVal === "" ? null : val)).nullable()
})

Yup.addMethod(Yup.array, "nullIfEmpty", function () {
  return this.transform((val, origVal) => (origVal === [] ? null : val)).nullable()
})
Yup.addMethod(Yup.array, "nullIfEmpty", function () {
  return this.transform((val, origVal) => (origVal === [] ? null : val)).nullable()
})
Yup.addMethod(Yup.mixed, "nullIfEmpty", function () {
  return this.transform((val, origVal) => origVal || val).nullable()
})

export default Yup
