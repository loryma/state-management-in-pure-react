import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function storeStateInLocalStorage(count) {
    localStorage.setItem('counterStorage', JSON.stringify({ count }));
}

// const useLocalStorage = (initialState, key) => {
//     const get = () => {
//         const storage = localStorage.getItem(key);
//         if (storage) return JSON.parse(storage).value;
//         return initialState;
//     };

//     const [value, setValue] = useState(get());

//     useEffect(() => {
//         localStorage.setItem(key, JSON.stringify({ value }));
//     }, [value]);

//     return [value, setValue];
// };

const App = ({ max, step = 1 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(count);

    let message = '';

    if (countRef.current < count) message = 'Higher';
    if (countRef.current > count) message = 'Lower';

    countRef.current = count;
    console.log(message);

    useEffect(() => {
        const timerId = setInterval(() => {
            console.log(`Count ${count}`);
        }, 3000);
        return () => clearInterval(timerId);
    }, [count]);

    const increment = () => {
        setCount(c => {
            if (c >= max) return c;
            return c + step;
        });
        // 'setCount(c => c + 1);
        // setCount(c => c + 1);'
    };
    const decrement = () => setCount(count - 1);
    return (
        <div className='Counter'>
            <p className='count'>{count}</p>
            <p>Message: {message}</p>
            <section className='controls'>
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
            </section>
        </div>
    );
};

export default App;
