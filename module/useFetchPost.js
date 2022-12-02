import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchPost = async (url, req) => {
    console.log("useFetchPost");
    // const [loading, setLoading] = useState(true);
    try {
        const res = await axios.post(url, req);
        return res.data;
    } catch (e) {
        console.log("😭");
        return  e;
    }
    finally {
        // setLoading(false);
    }
    
}