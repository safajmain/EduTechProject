 // تغيير الصورة الرئيسية عند الضغط على صورة مصغرة
function changeImage(img) {
  document.getElementById("main-image").src = img.src;
}

// API للطقس
const apiKey = "5eac98e548b2475894807cd656533b63";
const city = "Amman";
let currentUnit = "metric";

function getGreeting(hour) {
  return (hour >= 6 && hour < 18) ? "Good Morning!" : "Good Evening!";
}

async function loadWeather(unit) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&lang=en&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    const temp = Math.round(data.main.temp);
    const now = new Date();
    const jordanHour = now.toLocaleString("en-US", {
      timeZone: "Asia/Amman",
      hour: '2-digit',
      hour12: false
    });

    const greeting = getGreeting(parseInt(jordanHour));
    const unitSymbol = unit === "metric" ? "°C" : "°F";

    document.querySelector(".greeting").textContent = greeting;
    document.querySelector(".temperature-detail").textContent = 
      `The weather is clear sky in Amman, and it’s  ${temp}${unitSymbol}`;
  } catch (error) {
    document.getElementById("weather-message").textContent = "Error loading weather.";
    console.error(error);
  }
}

function startClock() {
  setInterval(() => {
    const now = new Date();
    const options = {
      timeZone: "Asia/Amman",
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const jordanTime = now.toLocaleTimeString('en-US', options);
    document.getElementById("clock").innerHTML = `Local time:<br>${jordanTime}`;
  }, 1000);
}

document.getElementById("temp-toggle").addEventListener("click", (e) => {
  if (e.target.classList.contains("temp-btn")) {
    const selectedUnit = e.target.getAttribute("data-unit");
    if (selectedUnit !== currentUnit) {
      currentUnit = selectedUnit;
      loadWeather(currentUnit);
      document.querySelectorAll(".temp-btn").forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
    }
  }
});

loadWeather(currentUnit);
startClock();




   /*card*/

  
  const buttons = document.querySelectorAll('.filters button');
  const cards = document.querySelectorAll('.card');
  const paidCountSpan = document.getElementById('paid-count');
  const freeCountSpan = document.getElementById('free-count');

  // عدّ الكروت عند بداية الصفحة
  function updateCounts() {
    let paidCount = 0;
    let freeCount = 0;
    cards.forEach(card => {
      if (card.dataset.type === 'paid') paidCount++;
      else if (card.dataset.type === 'free') freeCount++;
    });
    paidCountSpan.textContent = `(${paidCount})`;
    freeCountSpan.textContent = `(${freeCount})`;
  }

  // اظهار / اخفاء الكروت حسب الفلتر
  function filterCards(filter) {
    let visibleCount = 0;
    cards.forEach((card, index) => {
      const type = card.dataset.type;
      if (filter === 'all' || filter === type) {
        card.style.display = 'block';
        visibleCount++;

        // إظهار رقم الكارد في مكانه
        const numberSpan = card.querySelector('.card-number');
        numberSpan.style.display = 'inline-block';

        // تحديث الرقم داخل الكارد حسب الترتيب الظاهر (بدون رقم مكرر)
        numberSpan.textContent = `#${visibleCount}`;
      } else {
        card.style.display = 'none';
      }
    });
  }

  // إعداد الأحداث على الأزرار
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterCards(filter);
    });
  });

  // تهيئة العدادات وأول عرض (اظهار الكل)
  updateCounts();
  filterCards('all');
