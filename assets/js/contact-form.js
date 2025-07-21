const form = document.getElementById("contact-form");

form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent the page from reloading

  // Collect form data
  const data = {
    name: form.fname.value,
    email: form.email.value,
    message: form.message.value,
    lname: form.lname.value,
    date: document.querySelector("#default-today .picker-value").textContent,
    time: document.querySelector("#date-time-time .picker-value").textContent,
    phone: form.phone.value,
    address: form.address.value,
    numPeople: form["num-people"].value,
    audio: form.audio.value,
  };

  let valid = true;

  // Helper to set border color
  function setInvalid(input) {
    input.style.border = "1px solid red";
    valid = false;
  }
  function setValid(input) {
    input.style.border = "1px solid black";
  }

  // First Name
  if (!data.name.trim()) setInvalid(form.fname);
  else setValid(form.fname);

  // Last Name
  if (!data.lname.trim()) setInvalid(form.lname);
  else setValid(form.lname);

  // Email
  const emailPattern =
    /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
  if (!emailPattern.test(data.email.trim())) setInvalid(form.email);
  else setValid(form.email);

  // Phone
  const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  const phonePattern2 = /^[0-9]{10}$/; // Allow 10 digits without dashes
  if (
    !phonePattern.test(data.phone.trim()) &&
    !phonePattern2.test(data.phone.trim())
  )
    setInvalid(form.phone);
  else setValid(form.phone);

  // Date
  const datePicker = document.querySelector("#default-today .picker-value");
  if (datePicker.textContent === "Select Date")
    setInvalid(document.querySelector("#default-today .date-box"));
  else setValid(document.querySelector("#default-today .date-box"));

  // Time
  const timePicker = document.querySelector("#date-time-time .picker-value");

  if (timePicker.textContent === "Select Time")
    setInvalid(document.querySelector("#date-time-time .date-box"));
  else setValid(document.querySelector("#date-time-time .date-box"));

  // Address
  if (!data.address.trim()) setInvalid(form.address);
  else setValid(form.address);

  // Number of People
  const numPeople = parseInt(data.numPeople, 10);
  if (isNaN(numPeople) || numPeople <= 0) setInvalid(form["num-people"]);
  else setValid(form["num-people"]);

  const audio = document.getElementsByClassName("custom-radio");
  // Audio Equipment
  if (!data.audio) {
    for (const wrapper of audio) {
      setInvalid(wrapper);
    }
  } else {
    for (const wrapper of audio) {
      setValid(wrapper);
    }
  }

  // If any validation failed, stop here
  if (!valid) {
    document.getElementById("error-msg").textContent =
      "Please fill out all required fields correctly.";
    return;
  } else {
    document.getElementById("error-msg").textContent = "";
  }

  alert(
    `First Name: ${data.name}
        Last Name: ${data.lname}
        Email: ${data.email}
        Phone: ${data.phone}
        Date: ${data.date}
        Time: ${data.time}
        Address: ${data.address}
        Number of People: ${data.numPeople}
        Audio Equipment: ${data.audio}
        Message: ${data.message}`
  );

  // try {
  //   const response = await fetch("/api/email", {
  //     // Replace with your function URL if deployed elsewhere
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(data),
  //   });

  //   if (response.ok) {
  //     alert("Message sent successfully!");
  //     form.reset(); // Clear form fields
  //   } else {
  //     alert("Failed to send message. Please try again.");
  //   }
  // } catch (error) {
  //   alert(
  //     "Error sending message. Please check your internet connection."
  //   );
  //   console.error(error);
  // }
});
