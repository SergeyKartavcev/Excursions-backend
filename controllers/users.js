const service = require("../services/users");
const { NotFound, Unauthorized } = require("http-errors");

const updateUser = async (req, res, next) => {
  const { _id } = req.user;

  const { name, email, role } = req.body;

  if (!_id) {
    throw NotFound(404, "Not found");
  }
  try {
    const result = await service.updateUser(
      _id,
      {
        name,
        email,
        role,
      },
      {
        new: true,
      }
    );

    if (!result) {
      throw NotFound(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getCurrentUserInfo = async (req, res, next) => {
  const { _id } = req.user;

  if (!_id) {
    throw Unauthorized(401, "Not found");
  }

  try {
    const result = await service.getCurrentUserInfo(_id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = { updateUser, getCurrentUserInfo };
