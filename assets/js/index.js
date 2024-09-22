// Fetch posts
fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((posts) => {
    const postsContainer = document.getElementById('posts');
    if (postsContainer) {
        posts.slice(0, 6).forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                    <div class="post-content">
                        <h2>${post.title}</h2>
                        <p>${post.body.slice(0, 100)}...</p>
                        <a href="#" class="read-more" data-id="${post.id}">Читати далі</a>
                    </div>
                `;
            postsContainer.appendChild(postElement);
        });
        const readMoreButtons = postsContainer.querySelectorAll('.read-more');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const target = e.target;
                const postId = target.getAttribute('data-id');
                if (postId) {
                    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                        .then((response) => response.json())
                        .then((post) => {
                        const modalContent = document.getElementById('modalContent');
                        const modal = document.getElementById('myModal');
                        if (modalContent && modal) {
                            modalContent.innerHTML = `
                                        <h3>${post.title}</h3>
                                        <p>${post.body}</p>
                                    `;
                            modal.style.display = 'block';
                            // Trigger modal animation
                            setTimeout(() => {
                                modalContent.style.opacity = '1';
                                modalContent.style.transform = 'translateY(0)';
                            }, 0);
                        }
                    });
                }
            });
        });
    }
});
// Carousel
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');
    const totalSlides = slides.length;
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    const rightArrow = document.querySelector('.carousel-arrow.right');
    const leftArrow = document.querySelector('.carousel-arrow.left');
    if (rightArrow) {
        rightArrow.addEventListener('click', nextSlide);
    }
    if (leftArrow) {
        leftArrow.addEventListener('click', prevSlide);
    }
    setInterval(nextSlide, 5000);
});
// Modal
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
    const modalContent = document.getElementById('modalContent');
    if (modalContent) {
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(-20px)';
    }
};
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        const modalContent = document.getElementById('modalContent');
        if (modalContent) {
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'translateY(-20px)';
        }
    }
};
