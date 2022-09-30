import { useState } from "react"
import Image from "next/image"
import exp from '../assets/img/expand.png'
import col from '../assets/img/collapse.png'
import { useRouter } from "next/router"
import { useEffect } from "react"


export default function Sidebar() {
    const router = useRouter()
    const [ns, setNs] = useState(false)
    const [code, setCode] = useState(false)


    useEffect(() => {
        const path = router.pathname
        const allies = path.split('/')

        const liElm = document.getElementsByClassName('sidebarLinkListIteam')
        const links = document.querySelectorAll('li.sidebarLinkListIteam a')
        // const emElm = document.getElementsByClassName('emListItem')
        // const emLinks = document.querySelectorAll('li.emListItem a')

        links.forEach((e, i) => {
            const href = links[i].getAttribute('href')
            if (allies[1] == href.split('/')[1]) {
                liElm[i].classList.add('active')
            }
        })
        // emLinks.forEach((e, i) => {
        //     const href = emLinks[i].getAttribute('href')
        //     console.log(href)
        // })

        if (path != '/') {
            if (allies[1] == 'ns') {
                setNs(true)
            }
            if (allies[1] == 'code') {
                setCode(true)
            }
        }
    }, [])

    return (
        <section className='sidebarContainer'>
            <p className="sidebarTitle">Chapter 3</p>
            <p className="sidebarDes">Number System and Digital Devices Part 01</p>

            <ul className="sidebarLinkList">
                <li className="sidebarLinkListIteam">
                    <a href="/test"><span>3.1 </span> History</a>
                </li>
                <li className="sidebarLinkListIteam">
                    <div className="f-row fc">
                        <a href="/ns"><span>3.2 </span>Number System

                        </a>
                        {
                            !ns ? <span onClick={() => setNs(!ns)} > <Image src={exp} width={25} height={25}></Image> </span> : <span onClick={() => setNs(!ns)}> <Image src={col} width={25} height={25}></Image></span>
                        }


                    </div>
                    {ns &&
                        <ul id="3.2" className="emList">
                            <li className="emListItem "><a href="/ns/types"><span>3.2.1 </span>Types</a></li>
                            <li className="emListItem"><a href="/ns/types/interchanging-types"><span>3.2.2 </span>Changing Types</a></li>
                        </ul>
                    }
                </li>
                <li className="sidebarLinkListIteam">
                    <a href="/binary-addutuib-substructuin"><span>3.3 </span>Binary Addition/Substraction</a>
                </li>
                <li className="sidebarLinkListIteam">
                    <a href="/signed-number"><span>3.4 </span>Signed Number</a>
                </li>
                <li className="sidebarLinkListIteam">
                    <a href="/complement"><span>3.5 </span>2's Complement</a>
                </li>
                <li className="sidebarLinkListIteam">
                    <div className="f-row fc">
                        <a href="/code"><span>3.6 </span>Code</a>
                        {
                            !code ? <span onClick={() => setCode(!code)} > <Image src={exp} width={25} height={25}></Image> </span> : <span onClick={() => setCode(!code)}> <Image src={col} width={25} height={25}></Image></span>
                        }
                    </div>

                    {
                        code && <ul className="emList">
                            <li className="emListItem"><a href="/code/concept"><span>3.6.1 </span>Concept</a></li>
                            <li className="emListItem"><a href="/code/example"><span>3.6.2 </span>Example</a></li>
                        </ul>
                    }

                </li>
            </ul>
            <a href="" className="btn">Go to Part 2</a>
        </section >
    )
}