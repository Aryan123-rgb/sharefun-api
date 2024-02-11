import Users from "../models/User.js";

export const fetchLoggedInUserData = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the logged-in user and populate friends and friendRequest
    const loggedInUser = await Users.findById(userId).populate([
      "friends",
      "friendRequest",
    ]);

    // Find all users
    const allUsers = await Users.find({});

    // Extract friend IDs and friendRequest IDs
    const friendIds = loggedInUser.friends.map((friend) =>
      friend._id.toString()
    );
    const friendRequestId = loggedInUser.friendRequest.map((request) =>
      request._id.toString()
    );

    // Filter out friend suggestions
    const friendSuggestions = allUsers.filter(
      (user) =>
        user._id.toString() !== userId &&
        !friendIds.includes(user._id.toString()) &&
        !friendRequestId.includes(user._id.toString())
    );

    return res.status(201).json({
      err: false,
      msg: "User data fetched successfully",
      data: {
        friends: loggedInUser.friends,
        friendRequest: loggedInUser.friendRequest,
        friendSuggestions,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: true, msg: error.message });
  }
};

export const sendFriendRequest = async (req, res) => {
  const { loggedInUserId, targetUserId } = req.body;

  try {
    // Find the logged-in user and update the friendRequest field
    const updatedUser = await Users.findOneAndUpdate(
      { _id: loggedInUserId },
      { $addToSet: { friendRequest: targetUserId } },
      { new: true }
    );

    res.status(200).json({
      err: false,
      msg: "Friend request sent successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: true, msg: error.message });
  }
};
