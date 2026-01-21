
const questions = [
    {
        id: "q1",
        text: "What is your name?",
        type: "text",
        required: true,
        maxLength: 20
    },
    {
        id: "q2",
        text: "Select your gender",
        type: "radio",
        required: true,
        options: ["Male", "Female", "Other"]
    },
    {
        id: "q3",
        text: "Select your skills (minimum 1)",
        type: "checkbox",
        required: true,
        minSelect: 1,
        options: ["Java", "Python", "JavaScript", "C++"]
    }
];

const form = document.getElementById("surveyForm");

questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";

    const label = document.createElement("label");
    label.innerHTML = `<b>${q.text}</b>`;
    div.appendChild(label);
    div.appendChild(document.createElement("br"));

    if (q.type === "text") {
        const input = document.createElement("input");
        input.type = "text";
        input.id = q.id;
        input.oninput = () => validateQuestion(q);
        div.appendChild(input);
    }

    if (q.type === "radio") {
        q.options.forEach(opt => {
            const input = document.createElement("input");
            input.type = "radio";
            input.name = q.id;
            input.value = opt;
            input.onclick = () => validateQuestion(q);
            div.appendChild(input);
            div.appendChild(document.createTextNode(opt));
            div.appendChild(document.createElement("br"));
        });
    }

    if (q.type === "checkbox") {
        q.options.forEach(opt => {
            const input = document.createElement("input");
            input.type = "checkbox";
            input.name = q.id;
            input.value = opt;
            input.onclick = () => validateQuestion(q);
            div.appendChild(input);
            div.appendChild(document.createTextNode(opt));
            div.appendChild(document.createElement("br"));
        });
    }

    const error = document.createElement("div");
    error.className = "error";
    error.id = q.id + "_error";
    div.appendChild(error);

    form.appendChild(div);
});

function validateQuestion(q) {
    const errorDiv = document.getElementById(q.id + "_error");
    errorDiv.innerText = "";

    if (q.type === "text") {
        const value = document.getElementById(q.id).value.trim();

        if (q.required && value === "") {
            errorDiv.innerText = "This field is required";
            return false;
        }
        if (value.length > q.maxLength) {
            errorDiv.innerText = `Maximum ${q.maxLength} characters allowed`;
            return false;
        }
    }
    if (q.type === "radio") {
        const selected = document.querySelector(`input[name="${q.id}"]:checked`);
        if (q.required && !selected) {
            errorDiv.innerText = "Please select an option";
            return false;
        }
    }
    if (q.type === "checkbox") {
        const checked = document.querySelectorAll(`input[name="${q.id}"]:checked`);
        if (checked.length < q.minSelect) {
            errorDiv.innerText = `Select at least ${q.minSelect} option(s)`;
            return false;
        }
    }

    return true;
}


function submitSurvey() {
    let isValid = true;

    questions.forEach(q => {
        if (!validateQuestion(q)) {
            isValid = false;
        }
    });

    if (!isValid) {
        alert("Please fix errors before submitting");
        return;
    }

    alert("Survey submitted successfully ✅");
}
