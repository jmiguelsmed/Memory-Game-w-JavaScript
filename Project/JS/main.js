//-------------ITW23/24 - Grupo 39 -------------//
//------------- Iolanda Leal 48069 -------------//
//------------- José Medeiros 58607 ------------//
//-------------Rita Wang 57143 -----------------//
//---------------------------------------------//

class MyHeader extends HTMLElement{
    connectedCallback(){
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        this.innerHTML = `
        <header>
            <nav class="navbar">
            ${isLoggedIn ? `
            <div class="logo">
             <a href="modos_de_jogo.html" title="Home" target="_parent"><img src="../Imagens/cat_logo.jpg"></a>
            </div>` : 

            `<div class="logo">
                <a href="pag_inicial.html" title="Home" target="_parent"><img src="../Imagens/cat_logo.jpg"></a>
            </div>`}
                

                
                              
                <div class="dropdown-header">
                    <svg class="tog" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z" fill="#000000"></path> </g></svg>
                    <div class="content">
                        <a href="regras_do_jogo.html" title="Regras do jogo" target="_parent">Regras</a>
                        <a href="tutorial.html" title="Tutorial do jogo" target="_parent">Tutorial</a>
                        <a href="curiosidades.html" title="Curiosidades" target="_parent">Curiosidades</a>
                        <a href="pontuacoes.html" title="Pontuações" target="_parent">Pontuações</a>
                    </div>
                </div>
                
            
                ${isLoggedIn ? `
                <div class="dropdown-profile">
                    <a id="profile-link">Perfil</a>
                    <div class="perfil-conteudo">
                        <a href="perfil.html" title="Log out"> <img src="../Imagens/meuperfil.png">
                                O meu perfil</a>
                        <a id="link-logout" onclick="logout()"> <img src="../Imagens/logout.png">Log out</a>
                    </div>
                </div>` : `<div class="dropdown-profile"></div>`}

            </nav>
        </header>`
 
    }
}

class MyFooter extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <footer>
            <div class="imagemfoot"><img src="../Imagens/modos-de-jogo/gato-footer.jpg"></div>
            <a href="sobre_nos.html" title="Sobre nós" target="_parent">Sobre nós</a>
            <br>
            <p>Introdução às Tecnologias Web (2023/2024) </p>
        </footer>
    
        `
 
    }
}

customElements.define('my-header', MyHeader)

customElements.define('my-footer', MyFooter)
