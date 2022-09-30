import '../styles/globals.css'

import { Navbar, Sidebar, Content } from '../Components/'

function MyApp({ Component, pageProps }) {
  return <>
    <Navbar />
    <section className='mainContainer'>
      <Sidebar />
      <section className='contentContainer'>
        <Component {...pageProps} />
      </section>
    </section>

  </>
}

export default MyApp
