
import 'bootstrap/dist/css/bootstrap.css'

export const Navbar = ({nickname}) => {

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2 mb-3">

        <div className="navbar-brand">
            Behrens
        </div>

        <div className="navbar-collapse">
            <div className="navbar-nav">

                <div className='nav-item nav-link'>
                    Master
                </div>

                <div className='nav-item nav-link'>
                    Grid
                </div>

            </div>
        </div>

        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
            <ul className="navbar-nav ml-auto">

                
                <span className='nav-item nav-link text-primary'>
                    {
                        nickname
                    }
                </span>

                <a href="/api/auth/logout" className='nav-item nav-link btn'>
                    Logout
                </a>
            </ul>
        </div>
    </nav>
  )
}