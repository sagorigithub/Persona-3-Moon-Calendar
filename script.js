const today = new Date();
today.setHours(0,0,0,0); 
const reference = new Date("1900-01-01");
const phase = ((today.getTime()-reference.getTime())/86400000)%29.53058770576;
const agePercent = lunarAgePercent();
let moonPhase = getPhase(), fullCount = daysUntilNextFullMoon();

document.getElementById('moon-phase').textContent = moonPhase;
document.getElementById('DUFM').textContent = `Days until full moon: ${fullCount}`;
document.getElementById('image').src = `Assets/Moons/${moonPhase}.webp`;

const year = today.getFullYear(), month = today.getMonth(), dayOfMonth = today.getDate(), dayOfWeek = today.getDay();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
document.getElementById("year").textContent = year;
document.getElementById("month-num").textContent = month + 1;
document.getElementById("date").textContent = dayOfMonth;
document.getElementById("month-name").textContent = monthNames[month];
document.getElementById("day-name").textContent = dayNames[dayOfWeek];
let memories = document.getElementById("play-memories");
let master = document.getElementById("play-master");

if (month == 2 && dayOfMonth == 5 && moonPhase == "Full") {
  document.body.classList.replace("blue", "green");
  memories.style.display = 'block';

} else if (month == 2 && dayOfMonth == 5) {
  memories.style.display = 'block';

} else if (moonPhase == "Full") {
  document.body.classList.replace("blue", "green");
  master.style.display = 'block';
}

let memoriesOfYou = new Audio('Assets/Memories of You.mp3');
memoriesOfYou.volume = 0.3;
let masterOfShadow = new Audio('Assets/Master of Shadow.mp3');
masterOfShadow.volume = 0.4;

memories.addEventListener('click', () => {
  memoriesOfYou.play();
});

master.addEventListener('click', () => {
  masterOfShadow.play();
});

const nextDate = new Date('2024-09-10');
const diffTime = nextDate - today;  
const diffDays = Math.ceil(diffTime / 86400000);  // convert to days

if (diffDays > 0) {
  document.getElementById('p3re').textContent = `Days until Episode Aigis releases: ${diffDays}`;
}
else {
  document.getElementById('p3re').textContent = "Episode Aigis is out!!!";
}

function getPhase() {
if (phase < 1.84566173161) {return "New";}
if (phase < 5.53698519483) {return "Waxing Crescent";}
if (phase < 9.22830865805) {return "First Quarter";}
if (phase < 12.91963212127) {return "Waxing Gibbous";}
if (phase < 16.61095558449) {return "Full";}
if (phase < 20.30227904771) {return "Waning Gibbous";}
if (phase < 23.99360251093) {return "Last Quarter";}
if (phase < 27.68492597415) {return "Waning Crescent";}
return "New";
}

function lunarAgePercent() {
return phase/29.53058770576;
}

function daysUntilNextFullMoon() {
    let daysUntilFullMoon;
    if (moonPhase == "Full") {
      daysUntilFullMoon = 0;
    }
    else if (agePercent < 0.5) {
      daysUntilFullMoon = Math.round((0.5 - agePercent) * 29.53058770576);
    }
    else {
      daysUntilFullMoon = Math.round((1 - agePercent + 0.5) * 29.53058770576);
    }
    return daysUntilFullMoon;
}