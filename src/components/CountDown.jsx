
import React, { useState, useEffect } from 'react';

function calculateTimeLeft(targetDate) {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
        };
    }

    return timeLeft;
}

function formatTimeLeft(timeLeft) {
    const { days, hours, minutes, seconds } = timeLeft;
    return `${days || '0'}d ${hours || '0'}h ${minutes || '0'}m ${seconds || '0'}s`;
}
function CountDown({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (

        <p className='text-4xl'>{formatTimeLeft(timeLeft)}</p>

    );
}

export default CountDown;

