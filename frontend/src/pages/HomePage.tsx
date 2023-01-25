import {useEffect} from "react";
import getMe from "../hooks/getMe";
import Logout from "../Auth/Logout";


export default function HomePage () {
    useEffect(() => {
        (async () => {
            const user = await getMe();
            console.log("Logged in user:", user);
            if (user.role === "USER") {
                console.log("You are logged in as a basic user!");
            }
        })();
    }, []);

    return (
        <div className="HomePage">
            <h1>Home</h1>
            <p>This is the Homepage.</p>
            <Logout/>
        </div>
    );
}