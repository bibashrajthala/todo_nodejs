const mediaController = () => {
  const upload = (req, res, next) => {
    console.log(req.file);
  };
  return upload;
};

module.exports = mediaController;
