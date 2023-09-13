const hideRealsTab = () => {
    const a = document.querySelector('a[href*="/reels/?hl"]');
    const b = document.querySelector('a[href*="/explore/?hl"]');
    if (a) a.parentNode.removeChild(a);
    if (b) b.parentNode.removeChild(b);
};

const hideShortsTab = () => {
    const shortsTab = document.querySelector('a[title="YouTube Shorts"]');

    if (shortsTab) {
        shortsTab.parentNode.removeChild(shortsTab);
    }
};

const createObserver = (callback) => {
    return new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (
                mutation.type === "childList" &&
                mutation.addedNodes.length > 0
            ) {
                console.log('call')
                callback();
            }
        }
    });
};

(() => {
    hideRealsTab();
    hideShortsTab();

    console.log('start')
    const config = {
        childList: true, // Watch for changes in the direct children of the targetNode
        subtree: true, // Watch for changes in the targetNode and its descendants
    };
    const YouTubeNode = document.body;
    const InstNode = document.body;

    if (YouTubeNode) {
        const YouTubeObserver = createObserver(hideShortsTab);
        YouTubeObserver.observe(YouTubeNode, config);
    }

    if (InstNode) {
        const InstObserver = createObserver(hideRealsTab);
        InstObserver.observe(InstNode, config);
    }
})();
