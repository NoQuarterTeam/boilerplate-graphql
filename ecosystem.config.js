module.exports = {
  apps: [
    {
      name: "api",
      script: "./packages/api/dist",
      instances: 1,
      exec_mode: "cluster",
    },
  ],
}
