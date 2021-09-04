export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Debateya API",
      version: "1.0.0",
      description: "Debateya api and sockets",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./src/routes/**/*.js", "./src/models/**/*.js"],
};
