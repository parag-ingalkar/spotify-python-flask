import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
            fetch(url, {
                credentials: "include",
            })
                .then((res) => {
                    if (!res.ok) {
                        throw Error("Could not fetch data");
                    }
                    console.log(res);
                    return res.json();
                })
                .then((data) => {
                    setData(data);
                    setIsPending(false);
                    setError(null);
                })
                .catch((err) => {
                    setError(err.message);
                    setIsPending(false);
                });
        }, [url]);

        return {data, isPending, error};
}


export default  useFetch;