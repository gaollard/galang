import buble from "rollup-plugin-buble"

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/galang.umd.js",
      format: "umd",
      name: "galang",
      sourcemap: true
    },
    {
      file: "dist/galang.ems.js",
      format: "es"
    }
  ],
  plugins: [
    buble({transforms: {dangerousForOf: true}})
  ],
}
