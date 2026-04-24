document.addEventListener("DOMContentLoaded", function () {
    var semesterPages = ["2026-1", "2025-2", "2025-1", "2024-2"];

    function createAnchor(href, text, className) {
        var link = document.createElement("a");
        link.href = href;
        link.textContent = text;
        if (className) {
            link.className = className;
        }
        return link;
    }

    function injectTopBar() {
        var topBar = document.createElement("div");
        var link1 = createAnchor("https://www.puc-rio.br", "PUC-Rio");
        var link2 = createAnchor(
            "https://dad.puc-rio.br",
            "Departamento de Artes & Design"
        );
        var separator = document.createElement("span");

        separator.textContent = "|";
        separator.className = "separator";

        topBar.classList.add("top-bar");
        topBar.appendChild(link1);
        topBar.appendChild(separator);
        topBar.appendChild(link2);

        document.body.insertBefore(topBar, document.body.firstChild);
        return topBar;
    }

    function getCurrentSemester() {
        var match = Array.from(document.body.classList).find(function (className) {
            return className.indexOf("semestre-") === 0;
        });

        if (!match) {
            return null;
        }

        return match.replace("semestre-", "");
    }

    function isSemesterIndexPage(currentSemester) {
        if (!currentSemester) {
            return false;
        }

        return !!(
            document.querySelector(".lista-projetos") &&
            document.querySelector("h3.ano-projetos") &&
            document.querySelector("h1") &&
            document.querySelector("h2") &&
            document.querySelector("p")
        );
    }

    function buildSemesterLink(semester, currentSemester) {
        var link = createAnchor("../" + semester + "/index.html", semester);

        if (semester === currentSemester) {
            link.classList.add("is-active");
            link.setAttribute("aria-current", "page");
        }

        return link;
    }

    function buildSemesterNav(currentSemester, className) {
        var nav = document.createElement("nav");
        nav.className = className;
        nav.setAttribute("aria-label", "Semesters");

        semesterPages.forEach(function (semester) {
            nav.appendChild(buildSemesterLink(semester, currentSemester));
        });

        return nav;
    }

    function injectSemesterHeader(topBar, currentSemester) {
        var body = document.body;
        var oldBackLink = document.querySelector(".back-link");
        var brasao = document.querySelector(".brasao");
        var heading = document.querySelector("h1");
        var subheading = document.querySelector("h2");
        var professors = document.querySelector("p");
        var hero = document.createElement("header");
        var inner = document.createElement("div");
        var titleGroup = document.createElement("div");
        var textGroup = document.createElement("div");
        var divider = document.createElement("div");
        var desktopNav = buildSemesterNav(
            currentSemester,
            "semester-nav semester-nav-desktop"
        );
        var menuButton = document.createElement("button");
        var buttonLabel = document.createElement("span");
        var mobileOverlay = document.createElement("div");
        var overlayBrasao = brasao ? brasao.cloneNode(true) : null;
        var overlayPanel = document.createElement("div");
        var overlayWordmark = document.createElement("div");
        var overlayTextGroup = document.createElement("div");
        var overlayCourseTitle = subheading.cloneNode(true);
        var overlayProfessors = professors.cloneNode(true);
        var overlayNav = buildSemesterNav(
            currentSemester,
            "semester-nav semester-nav-mobile"
        );

        if (oldBackLink) {
            oldBackLink.remove();
        }

        hero.className = "semester-header";
        hero.setAttribute("data-semester", currentSemester);

        inner.className = "semester-header-inner";
        titleGroup.className = "semester-title-group";
        textGroup.className = "semester-text-group";
        divider.className = "semester-title-divider";

        heading.classList.add("semester-wordmark");
        subheading.classList.add("semester-course-title");
        professors.classList.add("semester-professors");

        titleGroup.appendChild(heading);
        titleGroup.appendChild(divider);
        textGroup.appendChild(subheading);
        textGroup.appendChild(professors);
        titleGroup.appendChild(textGroup);
        inner.appendChild(titleGroup);
        inner.appendChild(desktopNav);

        menuButton.className = "semester-menu-toggle";
        menuButton.type = "button";
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-controls", "semester-overlay-nav");
        menuButton.setAttribute("aria-label", "Open semester menu");

        buttonLabel.className = "semester-menu-lines";
        buttonLabel.innerHTML =
            "<span></span><span></span><span></span>";
        menuButton.appendChild(buttonLabel);
        inner.appendChild(menuButton);

        mobileOverlay.className = "semester-menu-overlay";
        mobileOverlay.id = "semester-overlay-nav";

        if (overlayBrasao) {
            overlayBrasao.classList.add("semester-overlay-brasao");
            mobileOverlay.appendChild(overlayBrasao);
        }

        overlayPanel.className = "semester-menu-panel";
        overlayWordmark.className = "semester-overlay-wordmark";
        overlayWordmark.textContent = "DSG1863";
        overlayTextGroup.className = "semester-overlay-text-group";
        overlayCourseTitle.className = "semester-course-title";
        overlayProfessors.className = "semester-professors";
        overlayPanel.appendChild(overlayWordmark);
        overlayTextGroup.appendChild(overlayCourseTitle);
        overlayTextGroup.appendChild(overlayProfessors);
        overlayPanel.appendChild(overlayTextGroup);
        overlayPanel.appendChild(overlayNav);
        mobileOverlay.appendChild(overlayPanel);

        hero.appendChild(inner);
        hero.appendChild(mobileOverlay);

        topBar.insertAdjacentElement("afterend", hero);

        menuButton.addEventListener("click", function () {
            var isOpen = hero.classList.toggle("menu-open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close semester menu" : "Open semester menu"
            );
            body.classList.toggle("semester-menu-open", isOpen);
        });

        overlayNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                hero.classList.remove("menu-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Open semester menu");
                body.classList.remove("semester-menu-open");
            });
        });
    }

    var topBar = injectTopBar();
    var currentSemester = getCurrentSemester();

    if (isSemesterIndexPage(currentSemester)) {
        injectSemesterHeader(topBar, currentSemester);
    }
});
