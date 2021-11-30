import Header from '../ui/Header'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header/>
      <div className='container mx-auto px-10 mt-5'>
        {children}
      </div>
    </div>
  )
}

export default Layout
