const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  }
];

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => {
      return links.find(link => link.id === args.id);
    }
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
    },
    updateLink: (root, args) => {
      let link = links.find(link => link.id === args.id);
      link = {
        id: args.id,
        description: args.description,
        url: args.url
      };
      return link;
    },
    deleteLink: (root, args) => {
      let link = links.find(link => link.id === args.id);
      links.splice(links.indexOf(link), 1);

      return link;
    }
  }
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
