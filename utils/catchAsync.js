export default (routeHandler) => {
  return (req, res, next) => {
    routeHandler(req, res, next).catch((err) => next(err));
  };
};
