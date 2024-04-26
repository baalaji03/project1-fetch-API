function element(tag, classname, id, text) {
  let tags = document.createElement(tag);
  tags.classList = classname;
  tags.id = id;
  tags.innerHTML = text;
  return tags;
}
let container = element("div", "container", "", "");
const h1 = element("h1", "text-center", "title", "countries weather Details");
const row = element("div", "row", "", "");

const response = fetch("https://restcountries.com/v3.1/all");
response
  .then((data) => data.json())
  .then((result) => {
    for (let i = 0; i < result.length; i++) {
      const col = document.createElement("div");
      col.classList = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
      col.innerHTML = `
    <div class="card h-100">
    <div class="card-header">
    <h5 class="card-title text-center ">${result[i].name.common}</h5>
    </div>
    <div class="img-box">
    <img src="${result[i].flags.png}" class="card-img-top" alt="country image"/>
</div>
<div class="card-body">
<div class="card-text text-center ">Capital: ${result[i].capital}
<br>
Region: ${result[i].region}
<br>
Country Code: ${result[i].cca3}
<br>
</div>

<button class="btn btn-primary ">click for weather</button>
</div>
</div>
    `;
      row.append(col);
    }

    let buttons = document.querySelectorAll("button");

    buttons.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        let latlng = result[index].latlng;
        let lat = latlng[0];
        let lon = latlng[1];

        let weatherApi = fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=320f88482b07812c3a398414d4162344`
        );
        weatherApi
          .then((data1) => data1.json())
          .then((res) => {
            alert(
              `weather of ${result[index].name.common} is ${Math.floor(
                res.main.temp
              )}🌡️C`
            );
          });
      });
    });
  });
container.append(row);
document.body.append(h1, container);
