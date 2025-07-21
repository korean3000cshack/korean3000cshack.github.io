function smoothScroll(event) {
  event.preventDefault(); // prevent the default jump behavior
  console.log(event.target);
  const targetId = event.target.getAttribute("href").substring(1);
  const target = document.getElementById(targetId);

  if (!target) return;

  let modifier = 0;
  if (targetId === "about-div") {
    modifier = 40;
  } else if (targetId === "service-div") {
    modifier = 60;
  } else if (targetId === "book-div") {
    modifier = 90;
  }
  // if (window.innerHeight < 1000) {
  //   if (targetId === "about-div") {
  //     modifier = 10;
  //   } else if (targetId === "book-div") {
  //     modifier = 70;
  //   } else if (targetId === "service-div") {
  //     modifier = 20;
  //   }
  // } else {
  //   if (targetId === "about-div") {
  //     modifier = -200;
  //   } else if (targetId === "book-div") {
  //     modifier = -70;
  //   } else if (targetId === "service-div") {
  //     modifier = -140;
  //   }
  // }

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
