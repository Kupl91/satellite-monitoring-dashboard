// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Кастомный middleware для имитации ошибок
server.use(middlewares);

server.use(jsonServer.bodyParser);

// Имитируем ошибку 500 на эндпоинт /satellites/status в 10% случаев
server.get('/satellites/status', (req, res) => {
  if (Math.random() < 0.1) {
    res.status(500).jsonp({
      error: "Внутренняя ошибка сервера",
    });
  } else {
    // Получение статистики по статусам спутников
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

// Обработка других маршрутов
server.use(router);

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});