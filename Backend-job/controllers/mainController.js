const data = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
];
class MainController {
  getData(req, res, next) {
    try {
      res.send(data);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
}

module.exports = MainController;
