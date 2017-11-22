const realPath = path => `${process.env.REACT_APP_PATH_PREFIX || ""}${path}`
export default {
  home_path: realPath("/"),
  login_path: realPath("/login"),
  questions_path: realPath("/questions"),
}
