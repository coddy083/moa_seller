export const tokenSave = async (access, refresh) => {
    console.log("❤️",access,"❤️",refresh);
    try {
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
    } catch (e) {
        console.log("😭");
    }
}