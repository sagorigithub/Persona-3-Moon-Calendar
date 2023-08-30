fetch('/api/variables')
  .then(response => response.json())
  .then(data => {
    document.getElementById('moon-phase').textContent = data.phase;
    document.getElementById('DUFM').textContent = `Days until next full moon: ${data.daysUntilFullMoon}`;

    const phaseImages = {
      New: 'Assets/Moons/New Moon.webp',
      'Waxing Crescent': 'Assets/Moons/Waxing Crescent.webp',
      'First Quarter': 'Assets/Moons/First Quarter.webp',
      'Waxing Gibbous': 'Assets/Moons/Waxing Gibbous.webp',
      Full: 'Assets/Moons/Full Moon.webp',
      'Waning Gibbous': 'Assets/Moons/Waning Gibbous.webp',
      'Last Quarter': 'Assets/Moons/Last Quarter.webp',
      'Waning Crescent': 'Assets/Moons/Waning Crescent.webp'
    };

    document.getElementById('image').src = phaseImages[data.phase];

    const date = new Date();
    const year = date.getFullYear(), month = date.getMonth(), dayOfMonth = date.getDate(), dayOfWeek = date.getDay();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    document.getElementById("year").textContent = year;
    document.getElementById("month-num").textContent = month + 1;
    document.getElementById("date").textContent = dayOfMonth;
    document.getElementById("month-name").textContent = monthNames[month];
    document.getElementById("day-name").textContent = dayNames[dayOfWeek];

    if (month == 2 && dayOfMonth == 5 && data.phase == "Full") {
      document.body.classList.replace("blue", "green");
      footer.classList.replace("note", "note2");
      memories.style.display = 'block';

    } else if (month == 2 && dayOfMonth == 5) {
      memories.style.display = 'block';

    } else if (data.phase == "Full") {
      document.body.classList.replace("blue", "green");
      footer.classList.replace("note", "note2");
      master.style.display = 'block';
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

let footer = document.getElementById("footer");
let memories = document.getElementById("play-memories");
let master = document.getElementById("play-master");
let memoriesOfYou = new Audio('Assets/Memories of You.mp3');
memoriesOfYou.volume = 0.3;
let masterOfShadow = new Audio('Assets/Master of Shadow.mp3');
masterOfShadow.volume = 0.4;

memories.addEventListener('click', function() {
  memoriesOfYou.play();
});

master.addEventListener('click', function() {
  masterOfShadow.play();
});