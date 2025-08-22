function smoothScroll(event) {
  event.preventDefault(); // prevent the default jump behavior
  const targetId = event.target.getAttribute("href").substring(1);
  const target = document.getElementById(targetId);

  if (!target) return;

  let modifier = 0;

  if (window.innerWidth < 480) {
    if (targetId === "about-div") {
      modifier = 65;
    } else if (targetId === "service-div") {
      modifier = 60;
    } else if (targetId === "book-div") {
      modifier = 140;
    }
  } else if (window.innerWidth < 768) {
    if (targetId === "about-div") {
      modifier = 30;
    } else if (targetId === "service-div") {
      modifier = 30;
    } else if (targetId === "book-div") {
      modifier = 60;
    }
  } else if (window.innerWidth < 980) {
    if (targetId === "about-div") {
      modifier = 0;
    } else if (targetId === "service-div") {
      modifier = 60;
    } else if (targetId === "book-div") {
      modifier = 120;
    }
  } else if (window.innerWidth < 1280) {
    if (targetId === "about-div") {
      modifier = -50;
    } else if (targetId === "book-div") {
      modifier = -50;
    } else if (targetId === "service-div") {
      modifier = -40;
    }
  } else if (window.innerWidth < 1600) {
    if (targetId === "about-div") {
      modifier = -150;
    } else if (targetId === "book-div") {
      modifier = 0;
    } else if (targetId === "service-div") {
      modifier = -60;
    }
  } else if (window.innerWidth < 1920) {
    if (targetId === "about-div") {
      modifier = -200;
    } else if (targetId === "book-div") {
      modifier = -10;
    } else if (targetId === "service-div") {
      modifier = -100;
    }
  } else {
    if (targetId === "about-div") {
      modifier = -200;
    } else if (targetId === "book-div") {
      modifier = -70;
    } else if (targetId === "service-div") {
      modifier = -140;
    }
  }

  const targetPosition =
    target.getBoundingClientRect().top + window.scrollY + modifier;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  const duration = 1000; // milliseconds
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

let scrollTimeout;
const fadeElement = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    fadeElement.classList.add("visible");
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      fadeElement.classList.remove("visible");
    }, 1500);
  } else {
    fadeElement.classList.remove("visible");
  }
});
