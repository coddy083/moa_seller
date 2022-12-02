import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchGET = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const { data } = await axios.get(url);
            setData(data);
        } catch (error) {
            setError(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error };
};