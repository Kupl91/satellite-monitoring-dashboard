const fs = require('fs');

const types = ['communication', 'navigation', 'scientific'];
const statuses = ['active', 'inactive', 'maintenance'];

const generateSatellite = (id) => {
  const hasSpeed = Math.random() > 0.1; 
  const hasTemperature = Math.random() > 0.05;

  const satellite = {
    id: `SAT${id.toString().padStart(3, '0')}`,
    name: `Спутник-${id}`,
    type: types[Math.floor(Math.random() * types.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    coordinates: {
      longitude: parseFloat((Math.random() * 360 - 180).toFixed(6)),
      latitude: parseFloat((Math.random() * 180 - 90).toFixed(6)),
    },
    orbitHeight: Math.floor(Math.random() * (36000 - 160 + 1)) + 160, 
    speed: hasSpeed ? parseFloat((Math.random() * (8 - 7) + 7).toFixed(3)) : undefined,
    temperature: hasTemperature
      ? {
          mainSystem: parseFloat((Math.random() * 100 - 50).toFixed(2)), 
          communication: parseFloat((Math.random() * 100 - 50).toFixed(2)),
          powerUnit: parseFloat((Math.random() * 100 - 50).toFixed(2)),
        }
      : undefined,
    batteryLevel: Math.floor(Math.random() * 101),
    lastUpdate:
      Math.random() > 0.5
        ? new Date().toISOString()
        : new Date().toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
  };

  return satellite;
};

const satellites = [];
for (let i = 1; i <= 50; i++) {
  satellites.push(generateSatellite(i));
}

const db = { satellites };

fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log('Данные успешно сгенерированы в db.json');