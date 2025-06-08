import { useEffect, useState } from "react";

const useFetch = (url) => {
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);
	const [data, setData] = useState(null); // changed to null

	useEffect(() => {
		const abortCont = new AbortController();

		// Reset states on new fetch
		setIsPending(true);
		setError(null);
		setData(null); // clear stale data immediately

		setTimeout(() => {
			fetch(url, {
				credentials: "include",
				signal: abortCont.signal,
			})
				.then((res) => {
					if (!res.ok) {
						throw Error("Could not fetch data");
					}
					return res.json();
				})
				.then((data) => {
					setData(data);
					setIsPending(false);
					setError(null);
				})
				.catch((err) => {
					if (err.name === "AbortError") {
						console.log("Fetch aborted");
					} else {
						setError(err.message);
						setIsPending(false);
					}
				});
		}, 1000);

		return () => abortCont.abort();
	}, [url]);

	return { data, isPending, error };
};

export default useFetch;
