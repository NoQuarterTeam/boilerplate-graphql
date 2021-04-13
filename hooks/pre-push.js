const readlineSync = require("readline-sync")
const { exec } = require("./exec")
const currentBranch = exec("git rev-parse --abbrev-ref HEAD")

if (currentBranch === "master") {
  if (readlineSync.keyInYN("Are you sure you want to push to master? This will deploy the live site!")) {
    process.exit(0)
  } else {
    process.exit(1)
  }
}
