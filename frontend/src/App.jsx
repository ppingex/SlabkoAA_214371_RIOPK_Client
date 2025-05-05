import LoginPage from './pages/LoginPage'
import AdminPanel from './pages/AdminPanel'
import GlobalRoutes from './routes/GlobalRoutes'

function App() {

    return (
        <div className='w-[100vw] h-[100vh] bg-light-purple text-dark font-inter transition-all duration-300'>
            <GlobalRoutes />
        </div>
    )
}

export default App
