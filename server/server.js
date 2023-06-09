const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: authMiddleware,
	introspection: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));
}

const startServer = async () => {
	await server.start();
	server.applyMiddleware({ app });

	app.use(routes);
	app.listen(PORT, () => {
		console.log(`🌍 Now listening on localhost:${PORT}`);
	});
};

db.once("open", () => {
	startServer();
});
