const cleanStr = (title, Brackets) => {
    let [taskNumber, taskTitle] = title.split("]");
    
    taskNumber = taskNumber.replaceAll("[", "").trim();
    
    taskTitle = taskTitle
        .replaceAll('"', "")
        .replaceAll(" - Softermii JIRA", "")
        .replaceAll("- softermii jira", "")
        .replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll("FE:", "")
        .replaceAll("BE:", "")
        .replaceAll("  ", " ")
        .trim();

    if (Brackets) {
        return `[${taskNumber}] ${taskTitle}`;
    }
    return `${taskNumber}_${taskTitle}`;
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
                title += cleanStr(activeTab.title).toLocaleLowerCase();
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
                title += cleanStr(activeTab.title).toLocaleLowerCase();
                copy(title);
            }
        );
    });
});

