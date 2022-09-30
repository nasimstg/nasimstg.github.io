import { useState } from "react"
import Image from "next/image"
import expndI from '../../../../assets/img/expand-arrows.png'
const Steps = ({ }) => {

}

const MainContent = ({ o2o }) => {
    const [num1, setNum1] = useState(0)
    const [num2, setNum2] = useState(0)
    const [res, setRes] = useState(0)
    const [active, setActive] = useState(false)
    const [one2other, setOne2other] = useState('Results')
    const [dec, setDec] = useState(true)
    const [steps, setSteps] = useState(false)

    function Dec2Bin(x) {
        const elm = document.getElementById('steps')


        console.log(elm)
        setOne2other('Decimal to Binary')
        let bin = 0;
        let rem, i = 1, step = 1;
        while (x != 0) {
            rem = x % 2;
            const div = document.createElement('div')
            div.classList.add('spetContainer')
            div.innerHTML = `
            <p class='stepNumer'>${x}</p>
            <p class='stepBase'>2</p>
            <p class='stepRem'>${Math.floor(x / 2)}</p>
            <p class='stepRem'>${rem}</p>
            
            `
            console.log(
                `Step ${step++}: ${x}/2, Remainder = ${rem}, Quotient = ${parseInt(x / 2)}`
            );
            x = parseInt(x / 2);
            bin = bin + rem * i;
            i = i * 10;


            const text = document.createTextNode(`${x}`)
            const p = document.createElement('p')
            p.classList.add('number')
            p.appendChild(text)

            elm.append(div)
        }
        setRes(bin)
        console.log(`Binary: ${bin}`);
    }

    if (o2o === 'Decimal & Binary') {
        return (
            <section className="mainContentContainer">
                <h1 className="calcTitle">
                    Interchanging types between <span>{o2o}</span>
                </h1>
                <div className="content f-row">
                    <div className="inputsContainer f-col  f-1">
                        <div className="inpputWrapper f-col">
                            <div>
                                <label>Decimal</label>
                            </div>
                            <div>
                                <input type="number"
                                    onChange={(e) => { e.preventDefault; setNum1(e.target.value) }}
                                    defaultValue={num1}
                                    disabled={active} />
                            </div>
                            <div className="">
                                <button className="formBtn" onClick={() => Dec2Bin(num1)}>Calculate</button>
                            </div>
                        </div>
                        <div className="inpputWrapper f-col">
                            <div>
                                <label>Binary</label>
                            </div>
                            <div>
                                <input type="number"
                                    onChange={(e) => { e.preventDefault; setNum2(e.target.value) }}
                                    defaultValue={num2}
                                    disabled={active} />
                            </div>
                            <div className="">
                                <button className="formBtn">Calculate</button>
                            </div>
                        </div>

                    </div>
                    <div className="resultsContainer f-2">
                        <div className="resultTag">
                            <h2>{one2other}</h2>
                            <p>{dec ? 'Decimal' : 'Binary'} :{num1}</p>
                        </div>
                        <div className="resultsTag f-row jc-sb ai-c">
                            <p className="results">{!dec ? 'Converted to Decimal : ' : 'Converted to Binary : '}{res}</p>
                            <span className="btn"><Image src={expndI} width={25} height={25} /></span>
                        </div>
                        <div id="steps" className="steps">

                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (o2o === 'Decimal & Octet') {
        return (
            <section>
                <h1 className="calcTitle">
                    Interchanging types between <span>{o2o}</span>
                </h1></section>
        )
    }

    if (o2o === 'Decimal & Hexadecimal') {
        return (
            <section>
                <h1 className="calcTitle">
                    Interchanging types between <span>{o2o}</span>
                </h1></section>
        )
    }

    if (o2o === 'Binary & Octet') {
        return (
            <section>
                <h1 className="calcTitle">
                    Interchanging types between <span>{o2o}</span>
                </h1></section>
        )
    }

    if (o2o === 'Binary & Hexadecimal') {
        return (
            <section>
                <h1 className="calcTitle">
                    Interchanging types between <span>{o2o}</span>
                </h1></section>
        )
    }
    if (o2o === 'Hexadecimal & Octet') {
        return (
            <section>
                <h1 className="calcTitle">
                    Interchanging types between <span>{o2o}</span>
                </h1></section>
        )
    }
}
const ActiveBtn = ({ o2o, txt, o2otxt, func }) => {
    if (o2o == o2otxt) {
        return (
            <li className={"btns btnsActive"}
                onClick={() => func(o2otxt)}
            >
                {txt}
            </li>
        )
    } if (o2o != o2otxt) {
        return (
            <li className={"btns "}
                onClick={() => func(o2otxt)}
            >
                {txt}
            </li>
        )
    }

}

export default function index() {
    const [o2o, setO2o] = useState('Decimal & Binary')

    return (
        <section>
            <ul className="btnsContainer f-row fc">
                <ActiveBtn o2o={o2o} o2otxt='Decimal & Binary' txt="Dec&Bin" func={setO2o} />
                <ActiveBtn o2o={o2o} o2otxt='Decimal & Octet' txt="Dec&Oct" func={setO2o} />
                <ActiveBtn o2o={o2o} o2otxt='Decimal & Hexadecimal' txt="Dec&Hex" func={setO2o} />
                <ActiveBtn o2o={o2o} o2otxt='Binary & Octet' txt="Bin&Oct" func={setO2o} />
                <ActiveBtn o2o={o2o} o2otxt='Binary & Hexadecimal' txt="Bin&Hex" func={setO2o} />
                <ActiveBtn o2o={o2o} o2otxt='Hexadecimal & Octet' txt="Hex&Oct" func={setO2o} />
            </ul>
            <MainContent o2o={o2o} />
        </section>
    )
}
