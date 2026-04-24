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

    function injectNavbar() {
        const semesterInfo = getSemesterInfo(window.location.pathname);

        if (!semesterInfo || document.querySelector("[data-navbar-universal-host='true']")) {
            return;
        }

        const host = document.createElement("div");
        host.dataset.navbarUniversalHost = "true";
        host.style.position = "fixed";
        host.style.right = "0";
        host.style.bottom = "0";
        host.style.zIndex = "2147483647";
        host.style.margin = "0";
        host.style.padding = "0";
        host.style.lineHeight = "0";
        host.style.pointerEvents = "auto";

        const shadow = host.attachShadow({ mode: "open" });
        const link = document.createElement("a");
        link.href = getSemesterIndexUrl(semesterInfo);
        link.textContent = "Projetos " + semesterInfo.semester;

        const style = document.createElement("style");
        style.textContent = `
            :host {
                all: initial;
            }

            .nav-bar {
                width: 120px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0;
                padding: 0;
                background: #000;
                box-sizing: border-box;
            }

            a {
                color: #fff;
                font-family: "Space Grotesk", sans-serif;
                font-size: 0.8rem;
                font-weight: 400;
                line-height: 1;
                text-decoration: none;
                white-space: nowrap;
                padding: 0 0 2px;
            }

            a:hover {
                color: #ff0;
                text-decoration: underline;
            }

            @media (max-width: 1023px) {
                .nav-bar {
                    width: 120px;
                    height: 32px;
                    border-radius: 0;
                }

                a {
                    font-size: 0.8rem;
                }
            }
        `;

        const wrapper = document.createElement("div");
        wrapper.className = "nav-bar";
        wrapper.appendChild(link);

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        document.body.appendChild(host);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", injectNavbar);
    } else {
        injectNavbar();
    }
})();
