import * as Yup from "yup"

Yup.addMethod<Yup.StringSchema<string | null>>(
  Yup.string,
  "nullIfEmpty",
  function() {
    return this.transform((val, origVal) =>
      origVal.trim() === "" ? null : val,
    ).nullable()
  },
)

Yup.addMethod<Yup.NumberSchema<number | null>>(
  Yup.number,
  "nullIfEmpty",
  function() {
    return this.transform((val, origVal) =>
      origVal.trim() === "" ? null : val,
    ).nullable()
  },
)

export default Yup
