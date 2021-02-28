import * as readline from 'readline'

export const generateLogging = (req, status) => {
  if (process.env.NODE_ENV === 'development') {
    status === 'S' && console.log(req.method.bold, req.originalUrl.green)
    if (status === 'E') {
      readline.moveCursor(process.stdout, 0, -1)
      readline.clearLine(process.stdout, 1)
      console.log(req.method.bold, req.originalUrl.red.underline)
    }
  }
}
