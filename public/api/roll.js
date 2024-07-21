let hasScrolled = false;
window.addEventListener("wheel", (event) => {
  if (event.deltaY > 0 && !hasScrolled) {
    hasScrolled = true;
    window.location.href = "../../index2.html";
  }
});
