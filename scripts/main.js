const testimonials = document.querySelector('.swiper-wrapper');

(async function getUsersTestimonial(){
    try {
        const {users} = await (await fetch('../data/users.json')).json()
        
        users.map(user => {
            testimonials.innerHTML += `                    
            <div class="swiper-slide">
                <div class="testimonial_card">
                    <img src="assets/right-quote.png" >
                    <div class="content">
                        <p>${user.message}</p>
                        <div class="details">
                            <div class="userpicture">
                                <img src="assets/users/${user.avatar_img}.jpg" alt="">
                            </div>
                            <h3>${user.name}<br><span>${user.profession}</span></h3>
                        </div>
                    </div>
                </div>

            </div>`
        })

    } catch (error) {
        console.log(error)
    }
})();

const linkRegister = document.querySelector('#register-link');
const registerSection = document.querySelector('section.register');
const footerSection = document.querySelector('footer')

let scrollOptions = {}

linkRegister.addEventListener('click',() => {
    scrollOptions = {
        top: document.body.scrollHeight - registerSection.scrollHeight - footerSection.scrollHeight,
        left: 0,
        behavior: 'smooth'
    }
    window.scrollTo(scrollOptions)
})

const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const buttonRegister = document.querySelector('button.button')

async function saveInLocalStorage(){  
        const name = inputName.value;
        const email = inputEmail.value;

        if(name == '' || email == '') {
            alert('Preencha os dados');
            return
        }

    const data = {
        name,
        email
    }
    
    await localStorage.setItem('registerData',JSON.stringify(data, null, 2))

    inputName.value = null;
    inputEmail.value = null;
}

buttonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    saveInLocalStorage();

    const userData = localStorage.getItem('registerData')
    const user = JSON.parse(userData)
    alert(`Obrigado pelo seu cadastro ${user.name}`)
})
