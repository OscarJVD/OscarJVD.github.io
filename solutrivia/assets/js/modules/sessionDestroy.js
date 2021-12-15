let btnDestroy = ele("destroySession")

const destroySession = () => {
    removeItemLS("session")
    location.href = "../index.html";
}

eve(btnDestroy, "click", destroySession);