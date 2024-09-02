import { FC } from "react"

interface SavedProps {
    isHeader: boolean;
}

export const Saved: FC<SavedProps> = ({ isHeader }) => {
    return (
        // <svg style={isHeader ? { width: '1.822916vw', height: '1.822916vw' } : { width: '2.135416vw', height: '2.135416vw' }} width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M30.0547 5.675C31.9339 5.89367 33.3125 7.51488 33.3125 9.40771V35.8749L20.5 29.4687L7.6875 35.8749V9.40771C7.6875 7.51488 9.06442 5.89367 10.9453 5.675C17.2938 4.93809 23.7062 4.93809 30.0547 5.675Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        // </svg>
        <svg style={isHeader ? { width: '1.35vw', height: '1.35vw' } : { width: '1.8vw', height: '1.8vw' }} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.0591 3.59884C20.2508 3.7375 21.125 4.76559 21.125 5.96592V22.75L13 18.6875L4.875 22.75V5.96592C4.875 4.76559 5.74817 3.7375 6.94092 3.59884C10.9668 3.13152 15.0332 3.13152 19.0591 3.59884Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}