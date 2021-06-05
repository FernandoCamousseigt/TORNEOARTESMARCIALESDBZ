let personajes = ( () => {
    const url = "http://localhost:5501/dbz.json";
    const getData = async () => {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    };

    return { getData };
} ) ();

export default personajes;