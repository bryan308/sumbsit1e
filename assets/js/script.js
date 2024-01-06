
const theme = (function () {
    const checkbox = document.querySelector(".input");

    function setDarkModePreference(isDarkMode) {
        localStorage.setItem('darkMode', isDarkMode);
    }

    function toggleDarkMode() {
        const isDarkMode = document.body.classList.contains("dark");
        document.body.classList.toggle("dark", !isDarkMode);
        setDarkModePreference(!isDarkMode);
    }

    function checkDarkModePreference() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark', isDarkMode);
        checkbox.checked = isDarkMode;
    }

    checkbox.addEventListener("click", toggleDarkMode);

    checkDarkModePreference();
})();

// const checkbox = document.getElementById("checkbox"); // Assuming #checkbox is an input element
const hamburger = document.querySelector("#checkbox");
const navMenu = document.querySelector(".nav-menu");
const navMenuOverlay = document.querySelector(".overlay");
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));
hamburger.addEventListener("change", mobileMenu);

function mobileMenu() {
    if (hamburger.checked) {
        // The checkbox is checked, meaning the menu should be active
        navMenu.classList.add("active");
        navMenuOverlay.classList.add("active");
    } else {
        // The checkbox is not checked, meaning the menu should be inactive
        navMenu.classList.remove("active");
        navMenuOverlay.classList.remove("active");
    }
}

function closeMenu() {
    if (hamburger.checked) {
        hamburger.checked = false; // Uncheck the checkbox
        // The checkbox is not checked, meaning the menu should be inactive
        navMenu.classList.remove("active");
        navMenuOverlay.classList.remove("active");
    }
}

const navbar = document.querySelector('.navbar');
const navbarLinks = document.querySelectorAll('.nav-item .nav-link');

navbarLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        const duration = 20000;
        const delay = 100;
        setTimeout(() => {
            window.scroll({
                top: targetPosition,
                left: 0,
                behavior: 'smooth',
                duration: duration
            });
        }, delay);
    });
});

function randomValues() {
    anime({
        targets: '.shape-container .el',
        translateX: function () {
            return anime.random(-20, 20) + 'vw';
        },
        translateY: function () {
            return anime.random(-20, 20) + 'vh';
        },
        scale: function () {
            return anime.random(1, 1.5);
        },
        rotate: function () {
            return anime.random(-180, 180);
        },
        duration: function () {
            return anime.random(2000, 4000);
        },
        borderRadius: [
            {
                value: '20%'
            },
            {
                value: anime.random(12, 15) + '%', duration: 100
            },
            {
                value: '50%', duration: 1000
            }
        ],
        easing: 'easeOutElastic(.9, 1)',
    });
}

window.addEventListener('load', function () {
    randomValues();
    setInterval(randomValues, 4000);
});

const subCards = (function () {

    const subContents = [
        document.querySelector(".m-1-content"),
        document.querySelector(".m-2-content"),
        document.querySelector(".m-3-content"),
        document.querySelector(".m-4-content"),
        document.querySelector(".t-1-content"),
        document.querySelector(".t-2-content"),
        document.querySelector(".w-1-content"),
        document.querySelector(".w-2-content"),
        document.querySelector(".w-3-content"),
        document.querySelector(".w-4-content"),
        document.querySelector(".th-1-content"),
        document.querySelector(".th-2-content"),
        document.querySelector(".th-3-content"),
        document.querySelector(".f-1-content")
    ];

    const subContentButtons = [
        document.querySelector(".m_1"),
        document.querySelector(".m_2"),
        document.querySelector(".m_3"),
        document.querySelector(".m_4"),
        document.querySelector(".t_1"),
        document.querySelector(".t_2"),
        document.querySelector(".w_1"),
        document.querySelector(".w_2"),
        document.querySelector(".w_3"),
        document.querySelector(".w_4"),
        document.querySelector(".th_1"),
        document.querySelector(".th_2"),
        document.querySelector(".th_3"),
        document.querySelector(".f_1")
    ];

    const closeButtons = [
        document.querySelector(".close-m-1"),
        document.querySelector(".close-m-2"),
        document.querySelector(".close-m-3"),
        document.querySelector(".close-m-4"),
        document.querySelector(".close-t-1"),
        document.querySelector(".close-t-2"),
        document.querySelector(".close-w-1"),
        document.querySelector(".close-w-2"),
        document.querySelector(".close-w-3"),
        document.querySelector(".close-w-4"),
        document.querySelector(".close-th-1"),
        document.querySelector(".close-th-2"),
        document.querySelector(".close-th-3"),
        document.querySelector(".close-f-1")
    ];

    let activeIndex = -1; // Initialize as no active element 

    for (let i = 0; i < subContentButtons.length; i++) {

        subContentButtons[i].addEventListener("click", () => {
            if (activeIndex !== -1) {
                subContents[activeIndex].classList.remove("active");
                subContents[activeIndex].classList.add("closing");          // Add a class to trigger the closing transition 
                setTimeout(() => {
                    subContents[activeIndex].classList.remove("closing");   // Remove the closing class after a delay 
                }, 500);                                                    // Adjust the timeout value to match your CSS transition duration 
            } subContents[i].classList.toggle("active");
            activeIndex = i;

        }); closeButtons[i].addEventListener("click", () => {
            subContents[i].classList.add("closing");                        // Add a class to trigger the closing transition 
            setTimeout(() => {
                subContents[i].classList.remove("active");
                subContents[i].classList.remove("closing");                 // Remove the closing class after a delay 
            }, 500);                                                        // Adjust the timeout value to match your CSS transition duration 
            activeIndex = -1;
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        const lazyImages = document.querySelectorAll(".lazy-load");

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.getAttribute("data-src"); // Display the full-resolution image
                        lazyImage.classList.remove("lazy-load");
                        observer.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function (lazyImage) {
                observer.observe(lazyImage);
            });
        } else {
            // Fallback for older browsers
            lazyImages.forEach(function (lazyImage) {
                lazyImage.src = lazyImage.getAttribute("data-src"); // Display the full-resolution image
                lazyImage.classList.remove("lazy-load");
            });
        }
    });

    let updateStatusInterval; // Define the interval variable

    function updateStatus() {
        const now = new Date();
        for (const subject in announcement) {
            const subjectAnnouncements = announcement[subject];
            subjectAnnouncements.forEach((item) => {
                const timeDiffMilliseconds = new Date(item.datetime) - now;
                const timeDiffHours = timeDiffMilliseconds / (1000 * 60 * 60);
                const timeout = Math.floor(0.0001 * 60 * 60 * 1000);
                if (item.status === 'important') {
                    item.status = 'important';
                    if (timeDiffMilliseconds <= 0) {
                        item.status = 'in-progress';
                        console.log("Remaining " + timeDiffHours);
                        setTimeout(() => {
                            updateDisplayedContent();
                            console.log("text: " + item.text + "\n");
                            console.log("first updatedDisplay");
                            item.status = 'done';
                            //item.range = 0;
                        }, timeout);
                    }
                    if (item.status === 'done') {
                        if (prevStatus === 'in-progress') {
                            const remainingTimeout = prevTimeout - timeDiffMilliseconds;
                            if (remainingTimeout > 0) {
                                setTimeout(() => {
                                    updateDisplayedContent();
                                    console.log("2nd updatedDisplay");
                                    item.status = 'done';
                                }, remainingTimeout);
                            }
                        }
                    }
                } else if (item.status === 'normal') {
                    item.status = 'normal';
                }
            });
        }
        console.log("last updatedDisplay");
        updateDisplayedContent();
    }

    const daysAndSubjects = {
        "m_1_content": "itnet02",
        "m_2_content": "itnet02",
        "m_3_content": "itnet02",
        "m_4_content": "fil2",
        "t_1_content": "itws01",
        "t_2_content": "ge02",
        "w_1_content": "nstp2",
        "w_2_content": "itws01",
        "w_3_content": "itws01",
        "w_4_content": "cc102",
        "th_1_content": "ge01",
        "th_2_content": "cc102",
        "th_3_content": "cc102",
        "f_1_content": "pathfit2"
    };

    function updateDisplayedContent() {
        for (const day in daysAndSubjects) {
            const element = document.getElementById(day);
            if (element) {
                element.style.whiteSpace = "pre-line";
                const subject = daysAndSubjects[day];
                let content = "";
                announcement[subject].forEach((item) => {
                    if (item.text !== "") {
                        const deadlineText = item.datetime
                            ? `Until ${formatReadableDate(item.datetime)}`
                            : "";

                        const statusClass = getStatusClass(item.status);
                        const textDecoration = item.status === "done" ? "line-through" : "none"; // Check if status is "done"

                        content += `<p><span id="status-circle" class="${statusClass}" style="background-color: ${getStatusColor(item.status)};"></span><span style="text-decoration: ${textDecoration};"> ${item.text}</span><span style="text-decoration: ${textDecoration}; color: var(--neutral-500); font-size: 10px;"> ${deadlineText}</span></p>`;
                    }
                });
                element.innerHTML = content;
            }
        }
    }

    function formatReadableDate(dateTimeString) {
        const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateTimeString).toLocaleString('en-US', options);
    }

    function getStatusClass(status) {
        switch (status) {
            case "important":
                return "important_pulse";
            case "in-progress":
                return "progress_pulse";
            case "done":
                return "done_pulse";
            case "normal":
                return "normal_pulse";
            default:
                return "";
        }
    }

    function getStatusColor(status) {
        switch (status) {
            case "important":
                return "#D50000";
            case "in-progress":
                return "#FF8F00";
            case "done":
                return "#00C853";
            case "normal":
                return "#4d4d4d";
            default:
                return "";
        }
    }

    clearInterval(updateStatusInterval); // Clear existing interval (if any) and start a new one
    updateStatusInterval = setInterval(updateStatus, 1000);

    document.addEventListener('DOMContentLoaded', () => {
        const copyButtons = document.querySelectorAll('.copy-text-button');

        copyButtons.forEach(button => {
            const reminderId = button.getAttribute('data-reminder');
            const liElement = document.querySelector(`[data-reminder-id="${reminderId}"]`);
            console.log(liElement);
            const reminderText = liElement.textContent.trim();

            if (reminderText) {
            } else {
                button.classList.add('hidden');
            }
        });

        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const reminderId = button.getAttribute('data-reminder');
                const liElement = document.querySelector(`[data-reminder-id="${reminderId}"]`);
                const reminderText = liElement.textContent.trim();

                if (reminderText) {
                    const textArea = document.createElement('textarea');
                    textArea.value = reminderText;

                    document.body.appendChild(textArea);

                    textArea.select();
                    document.execCommand('copy');

                    document.body.removeChild(textArea);

                    button.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                    setTimeout(() => {
                        button.innerHTML = '<i class="fa-solid fa-clipboard"></i> Copy Text';
                    }, 1500);
                }
            });
        });
    });

})();