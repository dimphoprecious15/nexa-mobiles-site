// enquiry.js - validation and instant quote for enquiry.html

// EDIT THESE: placeholder prices (Rand) and stock. Replace with your real Nexa Mobiles figures.
const catalogue = {
    iphone13:    { name: "iPhone 13",     new: { 128: 12999, 256: 14999, 512: null }, preowned: { 128: 8499,  256: 9999,  512: null },  stock: { new: 3, preowned: 5 } },
    iphone14:    { name: "iPhone 14",     new: { 128: 15499, 256: 17499, 512: null }, preowned: { 128: 10999, 256: 12499, 512: null }, stock: { new: 2, preowned: 4 } },
    iphone14pro: { name: "iPhone 14 Pro", new: { 128: 19999, 256: 21999, 512: 25999 }, preowned: { 128: 14999, 256: 16999, 512: 19499 }, stock: { new: 0, preowned: 2 } },
    iphone15:    { name: "iPhone 15",     new: { 128: 17999, 256: 19999, 512: 23999 }, preowned: { 128: 13999, 256: 15499, 512: null }, stock: { new: 4, preowned: 1 } },
    iphone15pro: { name: "iPhone 15 Pro", new: { 128: 23999, 256: 26999, 512: 31999 }, preowned: { 128: 19499, 256: 21999, 512: 25499 }, stock: { new: 1, preowned: 0 } }
};

const form = document.getElementById("enquiryForm");
const result = document.getElementById("enquiryResult");
const message = document.getElementById("message");
const charCount = document.getElementById("charCount");

// South African numbers: 0821234567, 082 123 4567, +27821234567, 0027821234567
const phonePattern = /^(?:\+27|0027|0)[1-9]\d{8}$/;
const namePattern = /^[A-Za-z][A-Za-z '\-]{1,59}$/;

function setError(id, text) {
    document.getElementById(id + "-error").textContent = text;
    document.getElementById(id).classList.toggle("invalid", text !== "");
    return text === "";
}

function validate() {
    let ok = true;

    const name = form.fullname.value.trim();
    if (!namePattern.test(name)) {
        ok = setError("fullname", "Enter your full name (letters only, at least 2 characters).") && ok;
    } else setError("fullname", "");

    const phone = form.whatsapp.value.replace(/[\s-]/g, "");
    if (!phonePattern.test(phone)) {
        ok = setError("whatsapp", "Enter a valid SA number, e.g. 072 123 4567 or +27 72 123 4567.") && ok;
    } else setError("whatsapp", "");

    const email = form.email.value.trim();
    if (email !== "" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        ok = setError("email", "Enter a valid email address or leave it blank.") && ok;
    } else setError("email", "");

    ["model", "storage", "condition"].forEach(function (id) {
        if (form[id].value === "") {
            ok = setError(id, "Please choose an option.") && ok;
        } else setError(id, "");
    });

    if (message.value.length > 300) {
        ok = setError("message", "Message must be 300 characters or less.") && ok;
    } else setError("message", "");

    return ok;
}

function buildResponse() {
    const item = catalogue[form.model.value];
    const cond = form.condition.value;
    const storage = form.storage.value;
    const price = item[cond][storage];
    const stock = item.stock[cond];
    const condLabel = cond === "new" ? "New" : "Pre-owned";
    const name = form.fullname.value.trim().split(" ")[0];

    if (price === null) {
        return "<h3>Thanks, " + name + "!</h3><p>The " + item.name + " " + storage + " GB (" + condLabel + ") isn't a combination we normally stock. Message us on WhatsApp and we'll source it for you.</p>";
    }

    const availability = stock > 0
        ? "<strong>In stock</strong> (" + stock + " available)"
        : "<strong>Currently out of stock</strong>. We can order it in, usually within a few days.";

    return "<h3>Thanks, " + name + "!</h3>" +
        "<p><strong>" + item.name + " " + storage + " GB (" + condLabel + ")</strong></p>" +
        "<p>Estimated price: <strong>R" + price.toLocaleString("en-ZA") + "</strong></p>" +
        "<p>Availability: " + availability + "</p>" +
        "<p>We'll contact you on " + form.whatsapp.value.trim() + " to confirm.</p>";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validate()) {
        result.innerHTML = buildResponse();
        result.hidden = false;
        result.scrollIntoView({ behavior: "smooth" });
        form.reset();
        charCount.textContent = "0 / 300";
    } else {
        result.hidden = true;
        const firstBad = form.querySelector(".invalid");
        if (firstBad) firstBad.focus();
    }
});

// Live character counter and clearing errors as the user fixes them
message.addEventListener("input", function () {
    charCount.textContent = message.value.length + " / 300";
});
form.addEventListener("input", function (e) {
    if (e.target.classList.contains("invalid")) validate();
});