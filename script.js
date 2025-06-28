const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '-50px'
});

document.querySelectorAll('.glass-card').forEach(card => {
    observer.observe(card);
});

const robot = document.querySelector('.robot');
let currentBox = 0;
const boxes = document.querySelectorAll('.glass-card');

function updateRobotPosition() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    boxes.forEach((box, index) => {
        const boxRect = box.getBoundingClientRect();
        const boxTop = boxRect.top + scrollY;
        const boxBottom = boxTop + boxRect.height;
        
        if (scrollY + windowHeight/2 >= boxTop && scrollY + windowHeight/2 <= boxBottom) {
            if (currentBox !== index) {
                currentBox = index;
                robot.style.top = (boxTop - scrollY + boxRect.height/2 - 15) + 'px';
            }
        }
    });
}

window.addEventListener('scroll', updateRobotPosition);

setTimeout(() => {
    robot.classList.add('moved');
    document.querySelector('.main-content').classList.remove('content-blur');
    updateRobotPosition();
}, 3000);

robot.addEventListener('click', () => {
    alert('🤖 Hi! Welcome to my portfolio!');
});