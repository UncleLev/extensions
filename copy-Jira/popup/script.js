/**
 * @returns {Promise<string>} title
 */
async function getCurrentTabTitle() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    return tab.title;
}
/**
 * @param {string} title
 * @param {boolean} Brackets
 * @param {boolean} isBug
 * @returns
 */
const cleanStr = (title, Brackets) => {
    let [taskNumber, taskTitle] = title.split("]");

    taskNumber = taskNumber.replaceAll("[", "").trim();

    taskTitle = taskTitle
        .slice(0, title.lastIndexOf("-"))
        .trim()
        .replaceAll('"', "")
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

/**
 * @param {string} str
 */
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

/**
 *
 * @param {object} param
 * @param {boolean} param.isBug
 * @param {boolean} param.isMarge
 */
const formatStr = async ({ isBug, isMarge } = {}) => {
    let title = await getCurrentTabTitle();
    let result = "";
    if (!isMarge) {
        title = title.toLocaleLowerCase();
        const prefix = isBug ? "bugfix/" : "feature/";
        result = prefix + cleanStr(title);
    } else {
        const prefix = isBug ? "fix:" : "feat:";
        result = prefix + cleanStr(title, true);
    }

    copy(result);
};

document.addEventListener("DOMContentLoaded", function () {
    const btnMarge = document.getElementById("marge");
    const btnMargeBug = document.getElementById("margeBug");
    const btnBug = document.getElementById("bug");
    const btnFeature = document.getElementById("feature");

    btnMarge.onclick = () => formatStr({ isMarge: true });
    btnMargeBug.onclick = () => formatStr({ isBug: true, isMarge: true });

    btnBug.onclick = () => formatStr({ isBug: true });
    btnFeature.onclick = () => formatStr();
});
