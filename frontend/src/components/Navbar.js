const Navbar = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Mi Proyecto</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard">Dashboard</a>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger nav-link" onClick={handleLogout}>Cerrar Sesión</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Iniciar Sesión</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/register">Registrarse</a>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
