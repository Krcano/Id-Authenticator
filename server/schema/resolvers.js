const { AuthenticationError } = require("apollo-server-express");
const { User, SearchInquiry } = require("../models/");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { _id }, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate(
          "searchInquiries"
        );
      }
    },
    searchInquiry: async (parent, { _id }) => {
      return SearchInquiry.findById({ _id });
    },
    // searchInquiries: async()=>{
    //   return SearchInquiry.find()
    // }
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      // First we create the user
      const user = await User.create({ username, email, password });
      // To reduce friction for the user, we immediately sign a JSON Web Token and log the user in after they are created
      const token = signToken(user);
      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
      const user = await User.findOne({ email });

      // If there is no user with that email address, return an Authentication error stating so
      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
      const correctPw = await user.isCorrectPassword(password);

      // If the password is incorrect, return an Authentication error stating so
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // If email and password are correct, sign user into the application with a JWT
      const token = signToken(user);

      // Return an `Auth` object that consists of the signed token and user's information
      return { token, user };
    },

    addSearchInquiry: async (
      parent,
      { firstName, lastName, dateOfBirth, image },
      context
    ) => {
      if (context.user) {
        const searchInquiry = await SearchInquiry.create({
          firstName,
          lastName,
          dateOfBirth,
          image,
        });

        console.log(searchInquiry);

        const updatedArray = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              searchInquiries: searchInquiry._id,
            },
          }
        );
        const userSearch = await User.findById({
          _id: context.user._id,
        }).populate("searchInquiries");
        console.log(userSearch);

        return searchInquiry;
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    updateSearchInquiry: async (
      parent,
      { _id, firstName, lastName, dateOfBirth, image },
      context
    ) => {
      const updatedSearch = await SearchInquiry.findOneAndUpdate(
        { _id: _id },
        { firstName, lastName, dateOfBirth, image },
        { new: true }
      );

      console.log(updatedSearch);
      return updatedSearch;
    },

    removeSearchInquiry: async (parent, { _id }, context) => {
      if (context.user) {
        const data = await SearchInquiry.findOneAndDelete(
          { _id: _id },
          { new: true }
        );
        console.log(data);

        // const updated = await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $pull: { searchInquiries: { _id: _id } } },
        //   { new: true }
        // );
        // console.log(updated);
        return data;
      }
    },

  },
};

module.exports = resolvers;
