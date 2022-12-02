export const getToken = () => {
    // localStrage에 access, refresh가 없으면 false를 반환
    // 있으면 true를 반환
    console.log("getToken");
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
