// document.addEventListener("DOMContentLoaded", () => {

//   fetch("pages/header.html")
//     .then(res => res.text())
//     .then(data => {
//       document.getElementById("header").innerHTML = data;
//     });

//   fetch("pages/footer.html")
//     .then(res => res.text())
//     .then(data => {
//       document.getElementById("footer").innerHTML = data;
//     });

//   fetch("pages/review_cards.html")
//   .then(res => res.text())
//   .then(data => {
//     document.getElementById("customer_review").innerHTML = data;
//     });
    
// });

//   const progressBar = document.getElementById("scrollProgress");

//   function updateScrollProgress() {
//     const scrollTop =
//       document.documentElement.scrollTop || document.body.scrollTop;

//     const scrollHeight =
//       document.documentElement.scrollHeight -
//       document.documentElement.clientHeight;

//     const scrolled = (scrollTop / scrollHeight) * 100;

//     const progress = Math.min(Math.max(scrolled, 0), 100);

//     progressBar.style.width = progress + "%";
//     progressBar.textContent = Math.round(progress) + "%";
//     progressBar.parentElement.setAttribute("aria-valuenow", Math.round(progress));
//   }

//   window.addEventListener("scroll", updateScrollProgress);

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------
     HTML PARTIAL LOADING
  --------------------------------*/

  const loadPartial = async (url, targetId) => {
    try {
      const res = await fetch(url);
      const data = await res.text();
      const target = document.getElementById(targetId);
      if (target) target.innerHTML = data;
    } catch (err) {
      console.error(`Failed to load ${url}`, err);
    }
  };

  loadPartial("pages/header.html", "header");
  loadPartial("pages/footer.html", "footer");
  loadPartial("pages/review_cards.html", "customer_review_section");

  /* -------------------------------
     SCROLL PROGRESS BAR
  --------------------------------*/

  const progressBar = document.getElementById("scrollProgress");

  if (!progressBar) return; // safety check

  const updateScrollProgress = () => {
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress = Math.min(
      Math.max((scrollTop / scrollHeight) * 100, 0),
      100
    );

    progressBar.style.width = progress + "%";
    progressBar.parentElement?.setAttribute(
      "aria-valuenow",
      Math.round(progress)
    );
  };

  /* -------------------------------
     CLEAN EVENT LISTENER HANDLING
  --------------------------------*/

  // Remove existing listener if any (safe re-init)
  window.removeEventListener("scroll", updateScrollProgress);

  // Attach fresh listener
  window.addEventListener("scroll", updateScrollProgress, { passive: true });

  // Initial calculation (on load)
  updateScrollProgress();

});



  const track = document.querySelector(".carousel-track");
  const cards = Array.from(document.querySelectorAll(".carousel-card"));
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let currentIndex = 1; // center item initially

  function updateCarousel() {
    cards.forEach(card => card.classList.remove("active"));

    cards[currentIndex].classList.add("active");

    const cardWidth = cards[0].offsetWidth + 40; // card + gap
    const offset = -(currentIndex - 1) * cardWidth;

    track.style.transform = `translateX(${offset}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (currentIndex < cards.length - 2) {
      currentIndex++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 1) {
      currentIndex--;
      updateCarousel();
    }
  });

  updateCarousel();