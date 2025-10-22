const hero = document.querySelector('.hero');
        const images = ["house1.jpg", "house2.jpg", "debt.jpg"]; // picha zako
        let current = 0;
    
        function changeBackground() {
            hero.style.background = `url(${images[current]}) center/cover no-repeat`;
            current = (current + 1) % images.length;
        }
    
        // start slideshow
        changeBackground();
        setInterval(changeBackground, 5000);// change every 5 sec
        const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';
    
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        const increment = target / 200;

        if(current < target){
            counter.innerText = `${Math.ceil(current + increment)}`;
            setTimeout(updateCounter, 15);
        } else {
            counter.innerText = target + (target >= 50 ? '+' : '');
        }
    }


    updateCounter();
});
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    let countersStarted = false;

    function runCounters() {
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const increment = Math.ceil(target / 200);

            const updateCounter = () => {
                const current = +counter.innerText.replace('+','');
                if(current < target){
                    counter.innerText = current + increment;
                    setTimeout(updateCounter, 15);
                } else {
                    counter.innerText = target + (target >= 50 ? '+' : '');
                }
            }

            updateCounter();
        });
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    window.addEventListener('scroll', () => {
        const statsSection = document.getElementById('stats');
        if(isInViewport(statsSection)) {
            runCounters();
        }
    });
});
let currentSlide = 0;
let slides = [];

function openLightbox(index, imgElement) {
    const card = imgElement.closest('.apartment-card');
    slides = Array.from(card.querySelectorAll('.apartment-images img'));
    currentSlide = index;

    document.getElementById('lightbox').style.display = "block";
    document.querySelector('.lightbox-img').src = slides[currentSlide].src;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = "none";
}

function changeSlide(n) {
    currentSlide += n;
    if(currentSlide < 0) currentSlide = slides.length - 1;
    if(currentSlide >= slides.length) currentSlide = 0;
    document.querySelector('.lightbox-img').src = slides[currentSlide].src;
}
document.addEventListener("DOMContentLoaded", () => {
    const chatBtn = document.getElementById("chat-btn");
    const chatBox = document.getElementById("chat-box");
    const closeChat = document.querySelector(".close-chat");
    const sendBtn = document.getElementById("send-btn");
    const chatInput = document.getElementById("chat-input");
    const chatBody = document.getElementById("chat-body");
  
    chatBtn.addEventListener("click", () => {
      chatBox.style.display =
        chatBox.style.display === "flex" ? "none" : "flex";
      chatBox.style.flexDirection = "column";
    });
  
    closeChat.addEventListener("click", () => {
      chatBox.style.display = "none";
    });
  
    sendBtn.addEventListener("click", sendMessage);
    chatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  
    function sendMessage() {
      const message = chatInput.value.trim();
      if (message !== "") {
        const msgDiv = document.createElement("div");
        msgDiv.classList.add("message", "user");
        msgDiv.textContent = message;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
        chatInput.value = "";
  
        // ✅ Correct WhatsApp number (no +)
        const phoneNumber = "+254795828952";
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
        // ✅ Open WhatsApp
        window.open(whatsappURL, "_blank");
      }
    }
  });
  