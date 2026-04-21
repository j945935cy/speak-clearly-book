document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const topNav = document.querySelector(".top-nav");

  if (menuToggle && topNav) {
    menuToggle.addEventListener("click", () => {
      topNav.classList.toggle("open");
    });
  }

  const backTop = document.createElement("button");
  backTop.className = "back-top";
  backTop.setAttribute("aria-label", "回到頂部");
  backTop.textContent = "↑";
  document.body.appendChild(backTop);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backTop.classList.add("show");
    } else {
      backTop.classList.remove("show");
    }
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    if (href.endsWith(currentPage)) {
      link.classList.add("active");
    }
  });
});
