import "./NavBar.css"

let NavBar = () =>{
    return(
        <nav>
            <h1>Casio</h1>
            <ul>
                <li>
                    <a className="active">Normal Calculator</a>
                </li>
                <li>
                    <a>Scientific Calculator</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;