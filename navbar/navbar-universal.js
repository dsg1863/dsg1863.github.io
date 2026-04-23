(function () {
    function getSemesterInfo(pathname) {
        const parts = pathname.split("/").filter(Boolean);
        const semesterIndex = parts.findIndex(function (part) {
            return /^\d{4}-\d$/.test(part);
        });

        if (semesterIndex === -1) {
            return null;
        }

        return {
            parts: parts,
            semester: parts[semesterIndex],
            semesterIndex: semesterIndex,
        };
    }

    function getSemesterIndexUrl(semesterInfo) {
        const url = new URL(window.location.href);
        const semesterPath = semesterInfo.parts
            .slice(0, semesterInfo.semesterIndex + 1)
            .concat("index.html")
            .join("/");

        url.pathname = "/" + semesterPath;
        url.search = "";
        url.hash = "";
        return url.href;
    }

    function injectStylesheet() {
        if (document.querySelector('link[data-navbar-universal="true"]')) {
            return;
        }

        const currentScript =
            document.currentScript ||
            document.querySelector('script[src*="navbar-universal.js"]');

        if (!currentScript) {
            return;
        }

        const linkTag = document.createElement("link");
        linkTag.rel = "stylesheet";
        linkTag.href = new URL("navbar-styles.css", currentScript.src).href;
        linkTag.dataset.navbarUniversal = "true";
        document.head.appendChild(linkTag);
    }

    function injectNavbar() {
        const semesterInfo = getSemesterInfo(window.location.pathname);

        if (!semesterInfo || document.querySelector(".nav-bar")) {
            return;
        }

        const nav = document.createElement("div");
        nav.className = "nav-bar";

        const link = document.createElement("a");
        link.href = getSemesterIndexUrl(semesterInfo);
        link.textContent = "Projetos " + semesterInfo.semester;

        nav.appendChild(link);
        document.body.prepend(nav);
    }

    injectStylesheet();

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectNavbar);
    } else {
        injectNavbar();
    }
})();
