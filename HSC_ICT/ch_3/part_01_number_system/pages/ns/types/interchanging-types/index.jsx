import { createElement, useState } from "react"
import Image from "next/image"
import expndI from '../../../../assets/img/expand-arrows.png'
const Steps = ({ one2other, dec, num1, num2, res, rtxt1, rtxt2 }) => {
    return (
        <div className="resultsContainer f-2">
            <div className="resultTag">
                <h2>{one2other}</h2>
                <p>{dec ? `Decimal : ${num1}` : `Binary: ${num2} `}</p>
            </div>
            <div className="resultsTag f-row jc-sb ai-c">
                <p className="results">{!dec ? rtxt1 : rtxt2}</p>
                <p className="span">{res}</p>
            </div>

            <div id="steps" className="steps">
                <p>Integral Part:</p>
                <table id="inte" className="customers">

                </table>
                <div id="inte" className="intePart">

                </div>
                <p>Fractional Part:</p>
                <table className="customers" id="frac">

                </table>
                <div className="fracPart" id="frac">

                </div>

            </div>
        </div>
    )
}

const MainContent = ({ o2o }) => {
    const [num1, setNum1] = useState(0.0)
    const [num2, setNum2] = useState(0.0)
    const [res, setRes] = useState(0)
    const [active, setActive] = useState(false)
    const [one2other, setOne2other] = useState('Results')
    const [dec, setDec] = useState(true)
    const [rtxt1, setRtxt1] = useState('Results : ')
    const [rtxt2, setRtxt2] = useState('Results : ')

    function Dec2Bin(x) {
        setOne2other('Decimal to Binary')
        setDec(true)
        let Integral = parseInt(x, 10);
        let fractional = x - Integral;
        let k_prec = 8
        const elm = document.getElementById('inte')
        const elm2 = document.getElementById('frac')
        elm.innerHTML = `<tr>
                <th>Steps</th>
                <th>Dec/Base</th>
                <th>Answer</th>
                <th>Reminder</th>
            </tr>`
        elm2.innerHTML = `<tr>
                <th>Steps</th>
                <th>Dec*Base</th>
                <th>Answer</th>
                <th>Bin Value</th>
            </tr>`
        console.log(elm)
        setOne2other('Decimal to Binary')
        let bin = 0;
        let rem, i = 1, step = 1;
        while (Integral != 0) {
            rem = Integral % 2;
            const tr = document.createElement('tr')
            tr.classList.add('spetContainer')
            tr.innerHTML = `
                <td>Step ${step++}</td>
                <td>${Integral} ÷ 2</td>
                <td>${Math.floor(Integral / 2)}</td>
                <td>${rem}</td>
            `
            Integral = parseInt(Integral / 2);
            bin = bin + rem * i;
            i = i * 10;

            elm?.append(tr)
        }
        if (fractional > 0) {
            bin += '.'
            while (k_prec-- > 0) {
                const tr = document.createElement('tr')
                tr.classList.add('spetContainer')
                tr.innerHTML = `
                <td>Step ${step++}</td>
                <td>${fractional} * 2</td>
                <td>${fractional * 2}</td>
                <td>${Math.floor(fractional * 2)}</td>
            `
                elm2.append(tr)
                // Find next bit in fraction
                fractional *= 2;
                let fract_bit = parseInt(fractional, 10);

                if (fract_bit == 1) {
                    fractional -= fract_bit;
                    bin +=
                        String.fromCharCode(1 + '0'.charCodeAt());
                }
                else {
                    bin +=
                        String.fromCharCode(0 + '0'.charCodeAt());
                }
            }
        }
        setRes(bin)
        console.log(`Binary: ${bin}`);
    }
    function Bin2Dec(x) {
        setOne2other('Binary to Decimal')
        setDec(false)
        const elm = document.getElementById('inte')
        const elm2 = document.getElementById('frac')
        elm.innerHTML = `<div class="basePow"></div>
        <div class="bin"></div>
        <div class="res"></div>`

        elm2.innerHTML = `
            <div class="bin"></div>
            <div class="basePow"></div>
            <div class="res"></div>
        `

        let res = 0.0
        if (x != 0) {
            const arr = x.split('.')

            let inte = arr[0]
            let frac = arr[1]
            let dec = 0;
            let pow = 0;
            const bp = document.querySelector('#inte .basePow')
            const bi = document.querySelector('#inte .bin')
            const re = document.querySelector('#inte .res')

            for (let i = inte.length - 1; i > -1; i--) {

                const p = document.createElement('p')
                p.innerHTML = `&nbsp;2<sup>${pow}</sup>`
                bp.append(p)
                const p1 = document.createElement('p')
                p1.innerHTML = `x ${inte[i]}`
                bi.append(p1)
                if (i != 0) {
                    const p2 = document.createElement('p')
                    p2.innerHTML = `${inte[i] * Math.pow(2, pow)}  + `
                    re.append(p2)
                } else {
                    const p2 = document.createElement('p')
                    p2.innerHTML = `${inte[i] * Math.pow(2, pow)}  = `
                    re.append(p2)
                }
                dec += inte[i] * Math.pow(2, pow)
                pow++
            }
            const p2 = document.createElement('p')
            p2.innerHTML = `${dec}`
            re.append(p2)

            res += dec
            dec = 0.0;
            pow = -1;
            const bp1 = document.querySelector('#frac .basePow')
            const bi1 = document.querySelector('#frac .bin')
            const re1 = document.querySelector('#frac .res')

            for (let i = 0; i < frac.length; i++) {

                const p = document.createElement('p')
                p.innerHTML = `2<sup>${pow}</sup>`
                bp1.append(p)

                const p1 = document.createElement('p')
                p1.innerHTML = `&nbsp;${frac[i]}`
                bi1.append(p1)

                if (i < frac.length - 1) {
                    const p2 = document.createElement('p')
                    p2.innerHTML = `${frac[i] * Math.pow(2, pow)}  + `
                    re1.append(p2)
                } else {
                    const p2 = document.createElement('p')
                    p2.innerHTML = `${frac[i] * Math.pow(2, pow)}  = `
                    re1.append(p2)
                }
                dec += frac[i] * Math.pow(2, pow)
                pow--
            }
            const p3 = document.createElement('p')
            p3.innerHTML = `${dec}`
            re1.append(p3)
            res += dec
        }

        console.log(res)
        setRes(res)
    }
    function Dec2Oct(x) {
        setOne2other('Decimal to Octet')
        setRtxt1('Converted to Octet:')
        setDec(true)
        let Integral = parseInt(x, 10);
        let fractional = x - Integral;
        let k_prec = 8
        const elm = document.getElementById('inte')
        const elm2 = document.getElementById('frac')
        elm.innerHTML = `<tr>
                <th>Steps</th>
                <th>Dec/Base</th>
                <th>Answer</th>
                <th>Reminder</th>
            </tr>`
        elm2.innerHTML = `<tr>
                <th>Steps</th>
                <th>Dec*Base</th>
                <th>Answer</th>
                <th>Bin Value</th>
            </tr>`
        console.log(elm)
        let bin = 0;
        let rem, i = 1, step = 1;
        while (Integral != 0) {
            rem = Integral % 2;
            const tr = document.createElement('tr')
            tr.classList.add('spetContainer')
            tr.innerHTML = `
                <td>Step ${step++}</td>
                <td>${Integral} ÷ 2</td>
                <td>${Math.floor(Integral / 2)}</td>
                <td>${rem}</td>
            `
            Integral = parseInt(Integral / 2);
            bin = bin + rem * i;
            i = i * 10;

            elm?.append(tr)
        }
        if (fractional > 0) {
            bin += '.'
            while (k_prec-- > 0) {
                const tr = document.createElement('tr')
                tr.classList.add('spetContainer')
                tr.innerHTML = `
                <td>Step ${step++}</td>
                <td>${fractional} * 2</td>
                <td>${fractional * 2}</td>
                <td>${Math.floor(fractional * 2)}</td>
            `
                elm2.append(tr)
                // Find next bit in fraction
                fractional *= 2;
                let fract_bit = parseInt(fractional, 10);

                if (fract_bit == 1) {
                    fractional -= fract_bit;
                    bin +=
                        String.fromCharCode(1 + '0'.charCodeAt());
                }
                else {
                    bin +=
                        String.fromCharCode(0 + '0'.charCodeAt());
                }
            }
        }
        setRes(bin)
        console.log(`Binary: ${bin}`);
    }
    function Oct2Dec(x) {
        setOne2other('Octet to Decimal')
        setRtxt1('Converted to Decimal:')
        setDec(false)
        const elm = document.getElementById('inte')
        const elm2 = document.getElementById('frac')
        elm.innerHTML = `<div class="basePow"></div>
        <div class="bin"></div>
        <div class="res"></div>`

        elm2.innerHTML = `
            <div class="bin"></div>
            <div class="basePow"></div>
            <div class="res"></div>
        `

        let res = 0.0
        if (x != 0) {
            const arr = x.split('.')

            let inte = arr[0]
            let frac = arr[1]
            let dec = 0;
            let pow = 0;
            const bp = document.querySelector('#inte .basePow')
            const bi = document.querySelector('#inte .bin')
            const re = document.querySelector('#inte .res')

            for (let i = inte.length - 1; i > -1; i--) {

                const p = document.createElement('p')
                p.innerHTML = `&nbsp;2<sup>${pow}</sup>`
                bp.append(p)
                const p1 = document.createElement('p')
                p1.innerHTML = `x ${inte[i]}`
                bi.append(p1)
                if (i != 0) {
                    const p2 = document.createElement('p')
                    p2.innerHTML = `${inte[i] * Math.pow(2, pow)}  + `
                    re.append(p2)
                } else {
                    const p2 = document.createElement('p')
                    p2.innerHTML = `${inte[i] * Math.pow(2, pow)}  = `
                    re.append(p2)
                }
                dec += inte[i] * Math.pow(2, pow)
                pow++
            }
            const p2 = document.createElement('p')
            p2.innerHTML = `${dec}`
            re.append(p2)

            res += dec
            dec = 0.0;
            pow = -1;
            const bp1 = document.querySelector('#frac .basePow')
            const bi1 = document.querySelector('#frac .bin')
            const re1 = document.querySelector('#frac .res')

            for (let i = 0; i < frac.length; i++) {

                const p = document.createElement('p')
                p.innerHTML = `2<sup>${pow}</sup>`
                bp1.append(p)

                const p1 = document.createElement('p')
                p1.innerHTML = `&nbsp;${frac[i]}`
                bi1.append(p1)

                if (i < frac.length - 1) {
                    const p2 = document.createElement('p')
                    p2.innerHTML = `${frac[i] * Math.pow(2, pow)}  + `
                    re1.append(p2)
                } else {
                    const p2 = document.createElement('p')
                    p2.innerHTML = `${frac[i] * Math.pow(2, pow)}  = `
                    re1.append(p2)
                }
                dec += frac[i] * Math.pow(2, pow)
                pow--
            }
            const p3 = document.createElement('p')
            p3.innerHTML = `${dec}`
            re1.append(p3)
            res += dec
        }

        console.log(res)
        setRes(res)
    }

    if (o2o === 'Decimal & Binary') {
        return (
            <section className="mainContentContainer">
                {/* <h1 className="calcTitle">
                    Interchanging types between <span>{o2o}</span>
                </h1> */}
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
                                <button className="formBtn" onClick={() => Bin2Dec(num2)}>Calculate</button>
                            </div>
                        </div>

                    </div>
                    <div className="resultsContainer f-2">
                        <div className="resultTag">
                            <h2>{one2other}</h2>
                            <p>{dec ? `Decimal : ${num1}` : `Binary: ${num2} `}</p>
                        </div>
                        <div className="resultsTag f-row jc-sb ai-c">
                            <p className="results">{!dec ? 'Converted to Decimal : ' : 'Converted to Binary : '}</p>
                            <p className="span">{res}</p>
                        </div>

                        <div id="steps" className="steps">
                            <p>Integral Part:</p>
                            <table id="inte" className="customers">

                            </table>
                            <div id="inte" className="intePart">

                            </div>
                            <p>Fractional Part:</p>
                            <table className="customers" id="frac">

                            </table>
                            <div className="fracPart" id="frac">

                            </div>

                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (o2o === 'Decimal & Octet') {
        return (
            <section className="mainContentContainer">
                {/* <h1 className="calcTitle">
                    Interchanging types between <span>{o2o}</span>
                </h1> */}
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
                                <button className="formBtn" onClick={() => Dec2Oct(num1)}>Calculate</button>
                            </div>
                        </div>
                        <div className="inpputWrapper f-col">
                            <div>
                                <label>Octet</label>
                            </div>
                            <div>
                                <input type="number"
                                    onChange={(e) => { e.preventDefault; setNum2(e.target.value) }}
                                    defaultValue={num2}
                                    disabled={active} />
                            </div>
                            <div className="">
                                <button className="formBtn" onClick={() => Oct2Dec(num2)}>Calculate</button>
                            </div>
                        </div>

                    </div>
                    <Steps one2other={one2other} num1={num1} num2={num2} dec={dec} res={res} rtxt1={rtxt1} rtxt2={rtxt2} />
                </div>
            </section>
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

export default function InterchanginTypes() {
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
