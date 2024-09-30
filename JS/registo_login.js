//-------------ITW23/24 - Grupo 39 -------------//
//------------- Iolanda Leal 48069 -------------//
//------------- José Medeiros 58607 ------------//
//-------------Rita Wang 57143 -----------------//
//---------------------------------------------//

const ASSOCIA_IDADE = {
    "menos18": "Menos de 18 anos",
    "18-24": "18 a 24 anos",
    "25-34": "25 a 34 anos",
    "35-44": "35 a 44 anos",
    "45-54": "45 a 54 anos",
    "55-64": "55 a 64 anos",
    "65mais": "Mais de 65 anos"
};

const ASSOCIA_GENERO = {
    "masculino": "Masculino",
    "feminino": "Feminino",
    "outro": "Outro"
};

function saveUserInfo(email, username, idade, genero) {
    const userDetails = { username, idade, genero };
    localStorage.setItem(email, JSON.stringify(userDetails));
}

function signUp(event) {
    event.preventDefault();

    let username = document.getElementById('signup-username').value;
    let password = document.getElementById('signup-password').value;
    let email = document.getElementById('signup-email').value;
    let genero = document.getElementById('genero').value;
    let idade = document.getElementById('idade').value;

    if (localStorage.getItem(email)) {
        alert("O email que inseriu já existe!");
    } else {
        const userDetails = { username, password, genero, idade };
        localStorage.setItem(email, JSON.stringify(userDetails));
        alert("Registo com sucesso!");
        document.getElementById("signup-form").reset();
        window.location = 'pag_inicial.html#popup-login';
    }
}

function login(event) {
    event.preventDefault();

    let email = document.getElementById('login-email').value.trim();
    let password = document.getElementById('login-password').value.trim();

    let storedUser = localStorage.getItem(email);

    if (storedUser) {
        storedUser = JSON.parse(storedUser);
        if (storedUser.password === password) {
            alert("Login com sucesso!");
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', email);
            window.location.href = "modos_de_jogo.html";
        } else {
            alert("Password incorreta!");
        }
    } else {
        alert("Email não registado!");
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn');
    alert('Logout com sucesso!');
    window.location.href = "pag_inicial.html";
}

function updateProfile(event) {
    event.preventDefault();

    const email = localStorage.getItem('loggedInUser');
    const newUsername = document.getElementById('new-username').value;
    const newAge = document.getElementById('new-age').value;
    const newGender = document.getElementById('new-gender').value;

    const storedUser = JSON.parse(localStorage.getItem(email));
    const updatedUser = {
        ...storedUser,
        username: newUsername || storedUser.username,
        idade: newAge || storedUser.idade,
        genero: newGender || storedUser.genero
    };
    localStorage.setItem(email, JSON.stringify(updatedUser));
    window.location.reload();
}

document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loggedInUserEmail = localStorage.getItem('loggedInUser');

    if (isLoggedIn && loggedInUserEmail) {
        const storedUser = JSON.parse(localStorage.getItem(loggedInUserEmail));

        let mostraIdade = ASSOCIA_IDADE[storedUser.idade] || storedUser.idade;
        let mostraGenero = ASSOCIA_GENERO[storedUser.genero] || storedUser.genero;

        if (storedUser) {
            document.getElementById('username-perfil').textContent = storedUser.username;
            document.getElementById('genero-perfil').innerText = `Género: ${mostraGenero}`;
            document.getElementById('idade-perfil').innerText = `Faixa etária: ${mostraIdade}`;
            

            // Valor default
            document.getElementById('new-username').value = storedUser.username;
            document.getElementById('new-age').value = storedUser.idade;
            document.getElementById('new-gender').value = storedUser.genero;
        }
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', signUp);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }

    const editProfileForm = document.getElementById('edit-profile-form');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', updateProfile);
    }
});

function editProfile() {
    document.getElementById('edit-profile-form').style.display = 'block';
    const loggedInUserEmail = localStorage.getItem('loggedInUser');
    const storedUser = JSON.parse(localStorage.getItem(loggedInUserEmail));

    document.getElementById('new-username').value = storedUser.username;
    document.getElementById('new-age').value = storedUser.idade;
    document.getElementById('new-gender').value = storedUser.genero;
}


function cancelEdit() {
    const form = document.getElementById('edit-profile-form');
    form.reset();
    form.style.display = 'none';
}
