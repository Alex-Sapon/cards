import React, { useState, useEffect } from 'react';

// Наш хук
export const useDebounce = (value: any, delay: any) => {

    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );
    return debouncedValue;
}