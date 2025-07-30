const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Remove 'active' class from all links
    navLinks.forEach((nav) => nav.classList.remove("active"));

    // Add 'active' class to the clicked link
    link.classList.add("active");
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((nav) => nav.classList.remove("active", "custom-active"));
    link.classList.add("active", "custom-active");
  });
});
