const express = require('express');
const { Moon } = require('lunarphase-js');
const app = express();
const port = 443;

app.use(express.static('public'));

// Export variables to script.js and what-not
app.get('/api/variables', (req, res) => {
  const lunarAgePercent = Moon.lunarAgePercent();
  const phase = Moon.lunarPhase();
  let daysUntilFullMoon = daysUntilNextFullMoon(lunarAgePercent);

  if (phase == "Full") {
    daysUntilFullMoon = 0;
  }

  res.json({
    lunarAgePercent: lunarAgePercent,
    phase: phase,
    daysUntilFullMoon: daysUntilFullMoon
  });
});

function daysUntilNextFullMoon(lunarAgePercent) {
  let daysUntilFullMoon;
  if (lunarAgePercent < 0.5) {
    daysUntilFullMoon = Math.ceil((0.5 - lunarAgePercent) * 29.53058770576);
  }
  else {
    daysUntilFullMoon = Math.ceil((1 - lunarAgePercent + 0.5) * 29.53058770576);
  }
  return daysUntilFullMoon;
}

// Start the server
app.listen(port, () => {
  console.log(`Up and running on port ${port}`);
});

var date = new Date();
var day = date.getDate(); hour = date.getHours(); minute = date.getMinutes();
console.log(`Day: ${day}, Hour: ${hour}, Minute: ${minute}`);