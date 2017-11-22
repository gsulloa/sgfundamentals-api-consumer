const realPath = path => `${process.env.REACT_APP_PATH_PREFIX || ""}${path}`
export default {
  homePath: realPath("/"),
  loginPath: realPath("/login"),
  questionsPath: realPath("/questions"),
  questionPath: id => realPath(`/questions/${id}`),
  questionsNewPath: realPath("/questions/new"),
  questionsEditPath: id => realPath(`/questions/${id}/edit`),
}
