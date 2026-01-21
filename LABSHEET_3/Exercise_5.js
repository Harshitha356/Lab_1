let currentStage = 1;


let formData = {
    name: "",
    email: "",
    username: "",
    password: "",
    updates: false,
    terms: false
};

function updateProgress() {
    const progress = (currentStage - 1) * 25;
    document.getElementById("progressBar").style.width = progress + "%";
}


function showStage(stage) {
    document.querySelectorAll(".stage").forEach(div => {
        div.classList.remove("active");
    });
    document.getElementById("stage" + stage).classList.add("active");
    currentStage = stage;
    updateProgress();
}

function nextStage(stage) {
    if (validateStage(stage)) {
        showStage(stage + 1);
    }
}

function prevStage(stage) {
    showStage(stage - 1);
}

function validateStage(stage) {
    document.getElementById("error" + stage).innerText = "";

    if (stage === 1) {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if (name === "" || email === "") {
            document.getElementById("error1").innerText = "All fields are required";
            return false;
        }

        formData.name = name;
        formData.email = email;
    }

    if (stage === 2) {
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username.length < 4 || password.length < 6) {
            document.getElementById("error2").innerText =
                "Username ≥ 4 chars, Password ≥ 6 chars";
            return false;
        }

        formData.username = username;
        formData.password = password;
    }

    if (stage === 3) {
        const terms = document.getElementById("terms").checked;

        if (!terms) {
            document.getElementById("error3").innerText =
                "You must accept terms";
            return false;
        }

        formData.updates = document.getElementById("updates").checked;
        formData.terms = terms;
    }

    return true;
}


function submitForm() {
    if (!validateStage(3)) {
        document.getElementById("error4").innerText =
            "Previous stage validation failed";
        return;
    }

    document.getElementById("progressBar").style.width = "100%";
    alert("Form submitted successfully ✅\n\n" + JSON.stringify(formData, null, 2));
}
