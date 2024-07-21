import { Calendar } from "fullcalendar";
//引入月历库
document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new Calendar(calendarEl, {
    initialView: "dayGridMonth",
  });
  calendar.render();
});
