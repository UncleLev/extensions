const cleanStr = (title, Brackets) => {
    let str = title
        .replaceAll('"', "")
        .replaceAll(" - Softermii JIRA", "")
        .replaceAll("- softermii jira", "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll("FE:", "")
        .replaceAll("BE:", "")
        .replaceAll("  ", " ");

    if (Brackets) {
        return `[${str.slice(0, 8)}]${str.slice(8)}`;
    }
    return `${str.slice(0, 8)}_${str.slice(9)}`;
};

const copy = (str) => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    window.close();
};

document.addEventListener("DOMContentLoaded", function () {
    var btnMarge = document.getElementById("marge");
    var btnBug = document.getElementById("bug");
    var btnFeature = document.getElementById("feature");

    btnMarge.addEventListener("click", async () => {
        let title = "";

        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
                const activeTab = tabs[0];
                title = activeTab.title;
                copy(cleanStr(title, true));
            }
        );
    });
    btnBug.addEventListener("click", async () => {
        let title = "bugfix/";

        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
                const activeTab = tabs[0];
                title += cleanStr(activeTab.title.toLocaleLowerCase());
                copy(title);
            }
        );
    });
    btnFeature.addEventListener("click", async () => {
        let title = "feature/";

        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
                const activeTab = tabs[0];
                title += cleanStr(activeTab.title.toLocaleLowerCase());
                copy(title);
            }
        );
    });
});
