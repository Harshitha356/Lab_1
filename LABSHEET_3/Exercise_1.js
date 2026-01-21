document.addEventListener('DOMContentLoaded', () => {
   
    const form = document.getElementById('regForm');
    const roleSelect = document.getElementById('role');
    const skillsGroup = document.getElementById('skillsGroup');
    const submitBtn = document.getElementById('submitBtn');
    
    const inputs = {
        username: document.getElementById('username'),
        email: document.getElementById('email'),
        age: document.getElementById('age'),
        skills: document.getElementById('skills'),
        password: document.getElementById('password'),
        confirmPassword: document.getElementById('confirmPassword')
    };
    const roleRules = {
        student: {
            minAge: 16,
            passwordMinLength: 6,
            passwordRegex: /.*/, 
            passwordText: "At least 6 characters.",
            emailDomain: null, 
            needsSkills: true
        },
        teacher: {
            minAge: 22,
            passwordMinLength: 8,
            passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
            passwordText: "At least 8 chars, including a number.",
            emailDomain: "school.edu", 
            needsSkills: true
        },
        admin: {
            minAge: 18,
            passwordMinLength: 12,
            
            passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
            passwordText: "Strong: 12+ chars, uppercase, lowercase, number, special char.",
            emailDomain: null,
            needsSkills: false 
        }
    };

    let currentRole = 'student'; 
    const setError = (input, message) => {
        const errorDiv = document.getElementById(`${input.id}Error`);
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    };

    const setSuccess = (input) => {
        const errorDiv = document.getElementById(`${input.id}Error`);
        input.classList.add('valid');
        input.classList.remove('invalid');
        errorDiv.style.display = 'none';
    };

    const validateField = (input) => {
        const value = input.value.trim();
        const rules = roleRules[currentRole];

        switch (input.id) {
            case 'username':
                if (value.length < 3) return setError(input, "Name must be at least 5 characters.");
                break;

            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    return setError(input, "Invalid email format.");
                }
                
                if (rules.emailDomain && !value.endsWith(rules.emailDomain)) {
                    return setError(input, `Email must end in @${rules.emailDomain}`);
                }
                break;

            case 'age':
                if (!value || value < rules.minAge) {
                    return setError(input, `Minimum age for ${currentRole} is ${rules.minAge}.`);
                }
                break;

            case 'skills':
                
                if (rules.needsSkills && value.length === 0) {
                    return setError(input, "Please list your skills.");
                }
                break;

            case 'password':
                if (value.length < rules.passwordMinLength) {
                    return setError(input, `Min length is ${rules.passwordMinLength}.`);
                }
                if (!rules.passwordRegex.test(value)) {
                    return setError(input, rules.passwordText);
                }
                break;

            case 'confirmPassword':
                if (value !== inputs.password.value) {
                    return setError(input, "Passwords do not match.");
                }
                break;
        }
        
        setSuccess(input);
    };

    const validateForm = () => {
        Object.values(inputs).forEach(input => {
            if (input.offsetParent !== null) { 
                validateField(input);
            }
        });
        checkFormValidity();
    };

    const checkFormValidity = () => {
        const visibleInputs = Object.values(inputs).filter(input => input.offsetParent !== null);
        const allValid = visibleInputs.every(input => input.classList.contains('valid'));
        submitBtn.disabled = !allValid;
    };

    roleSelect.addEventListener('change', (e) => {
        currentRole = e.target.value;
        
        Object.values(inputs).forEach(input => {
            input.classList.remove('valid', 'invalid');
            input.value = ''; 
            document.getElementById(`${input.id}Error`).style.display = 'none';
        });
        if (roleRules[currentRole].needsSkills) {
            skillsGroup.classList.remove('hidden');
        } else {
            skillsGroup.classList.add('hidden');
        }

        submitBtn.disabled = true;
    });
    Object.values(inputs).forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
            checkFormValidity();
        });
        if (input.id === 'password') {
            input.addEventListener('input', () => {
                if (inputs.confirmPassword.value) validateField(inputs.confirmPassword);
            });
        }
    });


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Registration Successful!");
        form.reset();
        submitBtn.disabled = true;
        Object.values(inputs).forEach(i => i.classList.remove('valid'));
    });
});