function pretendToFetch() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("HELLO!!!"), 1000);
    });
}

export default pretendToFetch;
