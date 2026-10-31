// contact.js - validation, email compiling and AJAX submit for contact.html

// EDIT THIS: the email address that should receive the messages.
const RECIPIENT_EMAIL = "tshiamocomfort15@gmail.com";

// OPTIONAL (AJAX): paste a free Formspree endpoint here, e.g. "https://formspree.io/f/abcdwxyz".

const FORM_ENDPOINT = "";

const form = document.getElementById("contactForm");
const statusBox = document.getElementById("formStatus");
const message = document.getElementById("message");
const charCount = document.getElementById("charCount");

const phonePattern = /^(?:\+27|0027|0)[1-9]\d{8}$/;
const namePattern = /^[A-Za-z][A-Za-z '\-]{1,59}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setError(id, text) {
    document.getElementById(id + "-error").textContent = text;
    document.getElementById(id).classList.toggle("invalid", text !== "");
    return text === "";
}

function validate() {
    let ok = true;

    if (!namePattern.test(form.fullname.value.trim())) {
        ok = setError("fullname", "Enter your full name (letters only, at least 2 characters).") && ok;
    } else setError("fullname", "");

    if (!emailPattern.test(form.email.value.trim())) {
        ok = setError("email", "Enter a valid email address, e.g. name@example.com.") && ok;
    } else setError("email", "");

    if (!phonePattern.test(form.phone.value.replace(/[\s-]/g, ""))) {
        ok = setError("phone", "Enter a valid SA number, e.g. 072 123 4567 or +27 72 123 4567.") && ok;
    } else setError("phone", "");

    if (form.type.value === "") {
        ok = setError("type", "Please choose a message type.") && ok;
    } else setError("type", "");

    const len = message.value.trim().length;
    if (len < 10) {
        ok = setError("message", "Please write at least 10 characters.") && ok;
    } else if (len > 500) {
        ok = setError("message", "Message must be 500 characters or less.") && ok;
    } else setError("message", "");

    return ok;
}

function buildEmail() {
    const subject = "Nexa Mobiles website: " + form.type.value;
    const body =
        "Name: " + form.fullname.value.trim() + "\n" +
        "Email: " + form.email.value.trim() + "\n" +
        "Phone: " + form.phone.value.trim() + "\n" +
        "Message type: " + form.type.value + "\n\n" +
        "Message:\n" + message.value.trim();
    return { subject: subject, body: body };
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function showDraft(email, note) {
    const link = "mailto:" + RECIPIENT_EMAIL +
        "?subject=" + encodeURIComponent(email.subject) +
        "&body=" + encodeURIComponent(email.body);

    statusBox.innerHTML =
        "<h4>" + note + "</h4>" +
        "<p><strong>To:</strong> " + escapeHtml(RECIPIENT_EMAIL) + "<br>" +
        "<strong>Subject:</strong> " + escapeHtml(email.subject) + "</p>" +
        "<pre>" + escapeHtml(email.body) + "</pre>" +
        "<a class=\"email-btn\" href=\"" + link + "\">Open in my email app and send</a>";
    statusBox.hidden = false;
    statusBox.scrollIntoView({ behavior: "smooth" });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validate()) {
        statusBox.hidden = true;
        const firstBad = form.querySelector(".invalid");
        if (firstBad) firstBad.focus();
        return;
    }

    const email = buildEmail();

    // AJAX submission (only if an endpoint has been set)
    if (FORM_ENDPOINT !== "") {
        statusBox.innerHTML = "<p>Sending your message...</p>";
        statusBox.hidden = false;

        fetch(FORM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
                name: form.fullname.value.trim(),
                email: form.email.value.trim(),
                phone: form.phone.value.trim(),
                type: form.type.value,
                message: message.value.trim()
            })
        })
        .then(function (response) {
            if (!response.ok) throw new Error("Request failed");
            statusBox.innerHTML = "<h4>Thank you, " + escapeHtml(form.fullname.value.trim().split(" ")[0]) + "!</h4><p>Your message was sent. We'll reply as soon as we can.</p>";
            form.reset();
            charCount.textContent = "0 / 500";
        })
        .catch(function () {
            showDraft(email, "We couldn't send that automatically. Please send it by email instead:");
        });
    } else {
        // No endpoint: show the compiled email so the customer can send it
        showDraft(email, "Your message is ready to send:");
    }
});

message.addEventListener("input", function () {
    charCount.textContent = message.value.length + " / 500";
});
form.addEventListener("input", function (e) {
    if (e.target.classList.contains("invalid")) validate();
});