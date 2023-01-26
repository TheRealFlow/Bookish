import Logout from "../Auth/Logout";
import {Link} from "react-router-dom";

export default function HomePage () {

    return (
        <>
            <h1>HomePage</h1>
            <h3>Willkommen bei Bookish</h3>
            <p>Bookish ist eine Plattform, auf der Sie Bücher verwalten können.</p>

            <Link to={"/mypage"}>Hier gehts zu deinen Büchern</Link>
            <Logout/>
        </>
    );
}