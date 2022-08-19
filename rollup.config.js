import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "./src/index.ts",
  plugins: [typescript({}), commonjs({})],
  output: [
    {
      format: "es",
      file: `dist/index.esm.js`
    },
    {
      format: "cjs",
      file: `dist/index.cjs.js`
    }
  ]
};
