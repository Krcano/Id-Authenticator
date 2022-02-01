const { AuthenticationError } = require("apollo-server-express");
const { User, SearchInquiry } = require("../models/");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("");
    },
    searchInquiry: async (parent, { _id }) => {
      return SearchInquiry.findById({ _id }).populate("");
    },
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
    // not too sure about this part, trying to  create a missing person and update the array of missing person under a profile if someone has an account
    addSearchInquiry: async (
      parent,
      { firstName, lastName, dateOfBirth, image },
      context
    ) => {
      if (context.user) {
        const searchInquiry = new SearchInquiry({
         
          firstName,
          lastName,
          dateOfBirth,
          image,
        });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { searchInquiries: searchInquiry },
        });
        console.log(searchInquiry);
        return searchInquiry;
      }
      // throw new AuthenticationError('You need to be logged in!');
    },

    updateSearchInquiry: async (parent, { firstName, lastName, dateOfBirth, image})=>{
       const updated = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { searchInquiries: {firstName, lastName, dateOfBirth, image}}  },
        { new: true }
       );
       return updated
    },

    removeSearchInquiry: async (parent, { _id}, context)=>{
      if( context.user){
         const updated = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { searchInquiries: {_id:_id}  } },
          { new: true }
         )
         return updated
      }
    }
  },
};

module.exports = resolvers;
