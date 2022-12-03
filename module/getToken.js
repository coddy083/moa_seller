export const getToken = () => {
    try {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");
        if (access && refresh) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log("😭");
    }
}
