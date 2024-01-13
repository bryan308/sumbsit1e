const theme = (function () {

    const c = document.querySelector(".input");

    function setDM(dm) {
        localStorage.setItem('darkMode', dm);
    }

    function toggledm() {
        const dm = document.body.classList.contains("dark");
        document.body.classList.toggle("dark", !dm);
        setDM(!dm);
    }

    function checkdmPref() {
        const dm = localStorage.getItem('darkMode') === 'true';
        document.body.classList.toggle('dark', dm);
        c.checked = dm;
    }

    c.addEventListener("click", toggledm);

    checkdmPref();
})();

const navbar = (function () {

    const h = document.querySelector("#checkbox");
    const nm = document.querySelector(".nav-menu");
    const nmo = document.querySelector(".overlay");
    const nl = document.querySelectorAll(".nav-link");

    nl.forEach(n => n.addEventListener("click", closeMenu));
    h.addEventListener("change", mobileMenu);

    function mobileMenu() {
        if (h.checked) {
            nm.classList.add("active");
            nmo.classList.add("active");
        } else {
            nm.classList.remove("active");
            navMenuOverlay.classList.remove("active");
        }
    }

    function closeMenu() {
        if (h.checked) {
            h.checked = false;
            nm.classList.remove("active");
            nmo.classList.remove("active");
        }
    }

    const nb = document.querySelector('.navbar');
    const nbl = document.querySelectorAll('.nav-item .nav-link');

    nbl.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = nb.offsetHeight;
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
})();

const subCards = (function () {

    const subContents = [
        document.querySelector(".m-1-content"),
        document.querySelector(".m-2-content"),
        document.querySelector(".m-3-content"),
        document.querySelector(".m-4-content"),
        document.querySelector(".t-1-content"),
        document.querySelector(".t-2-content"),
        document.querySelector(".t-3-content"),
        document.querySelector(".w-1-content"),
        document.querySelector(".w-2-content"),
        document.querySelector(".w-3-content"),
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
        document.querySelector(".t_3"),
        document.querySelector(".w_1"),
        document.querySelector(".w_2"),
        document.querySelector(".w_3"),
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
        document.querySelector(".close-t-3"),
        document.querySelector(".close-w-1"),
        document.querySelector(".close-w-2"),
        document.querySelector(".close-w-3"),
        document.querySelector(".close-th-1"),
        document.querySelector(".close-th-2"),
        document.querySelector(".close-th-3"),
        document.querySelector(".close-f-1")
    ];

    console.log(closeButtons);

    let activeIndex = -1;

    for (let i = 0; i < subContentButtons.length; i++) {

        subContentButtons[i].addEventListener("click", () => {

            for (let y = 0; y < subContentButtons.length; y++) {
                subContentButtons[y].disabled = true;
            }

            subContentButtons[i].disabled = true;

            if (activeIndex !== -1 && activeIndex !== i) {

                subContents[activeIndex].classList.remove("active");
                subContents[activeIndex].classList.add("closing");

                setTimeout(() => {
                    subContents[activeIndex].classList.remove("closing");
                }, 500);

            }

            subContents[i].classList.toggle("active");
            activeIndex = (activeIndex === i && subContents[i].classList.contains("active")) ? -1 : i;

        });

        closeButtons[i].addEventListener("click", () => {

            subContents[i].classList.add("closing");

            setTimeout(() => {
                subContents[i].classList.remove("active");
                subContents[i].classList.remove("closing");
                subContentButtons[i].disabled = false;
                for (let y = 0; y < subContentButtons.length; y++) {
                    subContentButtons[y].disabled = false;
                }
            }, 500);

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
                        lazyImage.src = lazyImage.getAttribute("data-src");
                        lazyImage.classList.remove("lazy-load");
                        observer.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(function (lazyImage) {
                observer.observe(lazyImage);
            });
        } else {
            lazyImages.forEach(function (lazyImage) {
                lazyImage.src = lazyImage.getAttribute("data-src");
                lazyImage.classList.remove("lazy-load");
            });
        }
    });

    let updateStatusInterval;

    function updateStatus() {
        const now = new Date();
        for (const subject in announcement) {
            const j = announcement[subject];
            j.forEach((i) => {
                const
                    start = (new Date(i.start) - now) / 1000,
                    end = (new Date(i.end) - now) / 1000,
                    c = console.log;
                if (i.status === 'important' && i.text != '') {
                    i.status = 'important';
                    c("text1:   " + i.text);
                    c("start1:  " + start);
                    c("end1:    " + end);
                    if (start <= 1) {
                        i.status = 'in-progress';
                        updateDisplayedContent();
                    }
                    c("STATUS1: " + i.status);
                    c(" ");
                }
                if (i.status === 'in-progress' && end <= 1) {
                    i.status = 'in-progress';
                    updateDisplayedContent();
                    c("text2:   " + i.text);
                    c("start2:  " + start);
                    c("end2:    " + end);
                    if (end <= 1) {
                        i.status = 'done';
                        updateDisplayedContent();
                    }
                    c("STATUS2: " + i.status);
                    c(" ");
                }
                if (i.status === 'normal') i.status = 'normal';
            });
        }
        updateDisplayedContent();
    }

    const daysAndSubjects = {
        "m_1_content": "itnet02",
        "m_2_content": "itnet02",
        "m_3_content": "itnet02",
        "m_4_content": "fil2",
        "t_1_content": "itws01",
        "t_2_content": "ge02",
        "t_3_content": "pathfit2",
        "w_1_content": "itws01",
        "w_2_content": "itws01",
        "w_3_content": "cc102",
        "th_1_content": "ge01",
        "th_2_content": "cc102",
        "th_3_content": "cc102",
        "f_1_content": "nstp2"
    };

    function updateDisplayedContent() {
        for (const day in daysAndSubjects) {

            const e = document.getElementById(day);

            if (e) {

                e.style.whiteSpace = "pre-line";
                const subject = daysAndSubjects[day];
                let content = "";

                announcement[subject].forEach((i) => {

                    if (i.text !== "") {

                        const dltxt = i.start
                            ? `Until ${formatReadableDate(i.start)}`
                            : "";

                        const statusClass = getStatusClass(i.status);
                        const textDecoration = i.status === "done" ? "line-through" : "none";

                        content += `<p><span id="status-circle" class="${statusClass}" style="background-color: ${getStatusColor(i.status)};"></span><span style="text-decoration: ${textDecoration};"> ${i.text}</span><span style="text-decoration: ${textDecoration}; color: var(--neutral-500); font-size: 10px;"> ${dltxt}</span></p>`;
                    }
                });

                e.innerHTML = content;
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

    clearInterval(updateStatusInterval);
    updateStatusInterval = setInterval(updateStatus, 1000);

})();