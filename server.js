const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();


server.use(middlewares);

server.use(jsonServer.bodyParser);

server.get('/satellites/status', (req, res) => {
  if (Math.random() < 0.1) {
    res.status(500).jsonp({
      error: "Внутренняя ошибка сервера",
    });
  } else {
    const satellites = router.db.get('satellites').value();
    const status = satellites.reduce(
      (acc, sat) => {
        if (acc[sat.status] !== undefined) {
          acc[sat.status] += 1;
        }
        return acc;
      },
      { active: 0, inactive: 0, maintenance: 0 }
    );
    res.jsonp(status);
  }
});

server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});