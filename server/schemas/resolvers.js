const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
	Query: {
		user: async (parent, args, context) => {
			if (context.user) {
				const user = await User.findById(context.user._id);
				return user;
			}
		},
	},
	// Mutation: {
	// 	async addUser(parent, { username, email, password }, context) {
	// 		const user = await User.create({ displayName: username, email, password });
	// 		const token = signToken(user);
	// 		return { token, user };
	// 	}
	// },
};

module.exports = resolvers;
