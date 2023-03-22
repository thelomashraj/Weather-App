import React, { useState, useEffect } from 'react'
import '../clock.css';

const Clock = () => {

    const deg = 6;
    const [hr, setHr] = useState(null);
    const [mn, setMn] = useState(null);
    const [sc, setSc] = useState(null);

    useEffect(() => {

        const interval = setInterval(() => {
            const day = new Date();
            const hh = day.getHours() * 30;
            const mm = day.getMinutes() * deg;
            const ss = day.getSeconds() * deg;

            hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
            mn.style.transform = `rotateZ(${mm}deg)`;
            sc.style.transform = `rotateZ(${ss}deg)`;
        }, 1000);

        return () => clearInterval(interval);
    }, [hr, mn, sc]);

    return (
        <>
            <div className="box">
                <div className="clock">
                    <div className="hour" >
                        <div className="hr" id="hr" ref={(ref) => setHr(ref)}></div>
                    </div>
                    <div className="min">
                        <div className="mn" id="mn" ref={(ref) => setMn(ref)}></div>
                    </div>
                    <div className="sec">
                        <div className="sc" id="sc" ref={(ref) => setSc(ref)}></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Clock
