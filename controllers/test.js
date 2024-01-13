const adminOnly = (req, res) => {
  res.send({
    message: "Allowed!",
  });
};

const allUsers = (req, res) => {
  res.send({
    message: "Allowed!",
  });
};

const userOnly = (req, res) => {
  res.send({
    message: "Allowed!",
  });
};

const openApi = (req, res) => {
  res.send({
    message: "Allowed!",
  });
};

module.exports = {
  adminOnly,
  allUsers,
  userOnly,
  openApi,
};
