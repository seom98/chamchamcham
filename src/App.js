import React, { useEffect } from "react";
import { db } from "./firebase";

const App = () => {
    useEffect(() => {
        console.log(db);
    });

    return <div></div>;
};

export default App;
