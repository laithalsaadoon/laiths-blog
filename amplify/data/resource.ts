import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	Author: a
		.model({
			name: a.string().required(),
			bio: a.string(),
			avatar: a.string(),
			posts: a.hasMany("Post", "authorId"),
		})
		.authorization((rules) => [
			rules.authenticated().to(["create", "update", "delete"]),
			rules.guest().to(["read"]),
		]),

	Post: a
		.model({
			title: a.string().required(),
			content: a.string().required(),
			slug: a.string().required(),
			status: a.enum(["DRAFT", "PUBLISHED"]),
			publishDate: a.datetime(),
			featuredImage: a.string(),
			excerpt: a.string(),
			authorId: a.id().required(),
			author: a.belongsTo("Author", "authorId"),
			comments: a.hasMany("Comment", "postId"),
			tags: a.hasMany("PostTag", "postId"),
			categories: a.hasMany("PostCategory", "postId"),
		})
		.secondaryIndexes((index) => [index("slug")])
		.authorization((rules) => [
			rules.authenticated().to(["create", "update", "delete"]),
			rules.guest().to(["read"]),
		]),

	Category: a
		.model({
			name: a.string().required(),
			slug: a.string().required(),
			description: a.string(),
			posts: a.hasMany("PostCategory", "categoryId"),
		})
		.authorization((rules) => [
			rules.authenticated().to(["create", "update", "delete"]),
			rules.guest().to(["read"]),
		]),

	Tag: a
		.model({
			name: a.string().required(),
			slug: a.string().required(),
			posts: a.hasMany("PostTag", "tagId"),
		})
		.authorization((rules) => [
			rules.authenticated().to(["create", "update", "delete"]),
			rules.guest().to(["read"]),
		]),

	PostTag: a
		.model({
			postId: a.id().required(),
			tagId: a.id().required(),
			post: a.belongsTo("Post", "postId"),
			tag: a.belongsTo("Tag", "tagId"),
		})
		.authorization((rules) => [
			rules.authenticated().to(["create", "update", "delete"]),
			rules.guest().to(["read"]),
		]),

	PostCategory: a
		.model({
			postId: a.id().required(),
			categoryId: a.id().required(),
			post: a.belongsTo("Post", "postId"),
			category: a.belongsTo("Category", "categoryId"),
		})
		.authorization((rules) => [
			rules.authenticated().to(["create", "update", "delete"]),
			rules.guest().to(["read"]),
		]),

	Comment: a
		.model({
			content: a.string().required(),
			authorName: a.string().required(),
			authorEmail: a.string().required(),
			postId: a.id().required(),
			post: a.belongsTo("Post", "postId"),
			parentCommentId: a.id(),
			parentComment: a.belongsTo("Comment", "parentCommentId"),
			replies: a.hasMany("Comment", "parentCommentId"),
		})
		.authorization((rules) => [
			rules.authenticated().to(["create", "update", "delete"]),
			rules.guest().to(["read"]),
		]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "userPool",
	},
	logging: { fieldLogLevel: "debug" },
	name: "amplify-gen2-blog",
});
