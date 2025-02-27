import styles from './Leaderboard.module.css'; // Import the CSS module
import CityLevelHeader from '../../components/CityLevelHeader/CityLevelHeader';
import char from "../../assets/UI/character/char1Half.png"
import { useState, useEffect } from 'react';

// const leaderboardData = [
//     { id: 1, name: 'Alice', points: 150, image: char },
//     { id: 2, name: 'Alice', points: 120, image: char },
//     { id: 3, name: 'Alice', points: 100, image: char },
//     { id: 4, name: 'Alice', points: 90, image: char },
//     { id: 5, name: 'Alice', points: 80, image: char },
//     { id: 6, name: 'Alice', points: 150, image: char },
//     { id: 7, name: 'Alice', points: 120, image: char },
//     { id: 8, name: 'Alice', points: 120, image: char },
//     { id: 9, name: 'Alice', points: 120, image: char },
//     { id: 10, name: 'Alice', points: 120, image: char },
// ];

const Leaderboard = () => {

    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                console.log('hi')
                const response = await fetch("http://localhost:3001/user/leaderboard");
                const result = await response.json();
                // console.log(result.data);
                if (result.sucess && result.data) {
                    console.log(result.data);

                    setLeaderboardData(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            }
        };
        fetchLeaderboard();
    }, []);










    return (
        <div style={{ height: '100vh', overflow: "scroll" }}>
            <CityLevelHeader />
            <div className={styles.leaderboard} style={{ marginTop: '40px', padding: '20px', background: 'rgba(25, 0, 252, 0.2)' }}>
                <svg width="100%" style={{ padding: "0px" }} height="100%" viewBox="0 0 390 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_diii_0_1)">
                        <path d="M2.41309 11.3914C2.41309 5.31622 7.33795 0.391357 13.4131 0.391357H58.4131V39.3914H13.4131C7.33796 39.3914 2.41309 34.4665 2.41309 28.3914V11.3914Z" fill="#CD212F" shape-rendering="crispEdges" />
                        <path d="M13.4131 0.980953H57.8235V38.8018H13.4131C7.66358 38.8018 3.00268 34.1409 3.00268 28.3914V11.3914C3.00268 5.64185 7.66358 0.980953 13.4131 0.980953Z" stroke="url(#paint0_linear_0_1)" stroke-width="1.17919" shape-rendering="crispEdges" />
                        <g filter="url(#filter1_d_0_1)">
                            <path d="M15.88 12.0094H19.554C20.3607 12.0094 20.962 12.2074 21.358 12.6034C21.7687 12.9994 21.974 13.5861 21.974 14.3634V19.1814C21.974 19.6948 21.886 20.1128 21.71 20.4354C21.5487 20.7581 21.2847 21.0074 20.918 21.1834L22.26 27.4094H20.126L19.026 21.7774L17.904 22.0634V27.4094H15.88V12.0094ZM19.62 19.5774C19.8693 19.5041 19.994 19.3428 19.994 19.0934V14.4074C19.994 14.1141 19.8473 13.9674 19.554 13.9674H17.904V19.9954L19.62 19.5774ZM28.196 12.0094L30.044 27.4094H27.822L27.47 23.8234H25.072L24.72 27.4094H22.586L24.434 12.0094H28.196ZM27.272 21.9094L26.458 13.9234H26.084L25.27 21.9094H27.272ZM33.359 12.0094L35.867 22.0634H35.999V12.0094H38.023V27.4094H35.625L33.161 17.7294H33.029V27.4094H31.005V12.0094H33.359ZM41.7946 12.0094V18.5434H42.1686L44.4566 12.0094H46.7446L43.8406 19.5334L46.9426 27.4094H44.6546L42.1246 20.3694H41.7946V27.4094H39.7706V12.0094H41.7946Z" fill="white" />
                        </g>
                    </g>
                    <g filter="url(#filter2_diii_0_1)">
                        <rect x="63" width="249" height="39" fill="#CD212F" shape-rendering="crispEdges" />
                        <rect x="63.5896" y="0.589596" width="247.821" height="37.8208" stroke="url(#paint1_linear_0_1)" stroke-width="1.17919" shape-rendering="crispEdges" />
                        <g filter="url(#filter3_d_0_1)">
                            <path d="M175.821 11.6181L178.329 21.6721H178.461V11.6181H180.485V27.0181H178.087L175.623 17.3381H175.491V27.0181H173.467V11.6181H175.821ZM187.051 11.6181L188.899 27.0181H186.677L186.325 23.4321H183.927L183.575 27.0181H181.441L183.289 11.6181H187.051ZM186.127 21.5181L185.313 13.5321H184.939L184.125 21.5181H186.127ZM196.745 27.0181V17.8001H196.613L195.007 27.0181H193.643L192.015 17.8001H191.861V27.0181H189.859V11.6181H192.477L194.259 22.1341H194.369L196.129 11.6181H198.769V27.0181H196.745ZM200.537 11.6181H205.707V13.5761H202.561V18.2401H205.047V20.1761H202.561V25.0381H205.707V27.0181H200.537V11.6181Z" fill="white" />
                        </g>
                    </g>
                    <g filter="url(#filter4_diii_0_1)">
                        <path d="M317 0H376C382.075 0 387 4.92487 387 11V28C387 34.0751 382.075 39 376 39H317V0Z" fill="#CD212F" shape-rendering="crispEdges" />
                        <path d="M317.59 0.589596H376C381.75 0.589596 386.41 5.25049 386.41 11V28C386.41 33.7495 381.75 38.4104 376 38.4104H317.59V0.589596Z" stroke="url(#paint2_linear_0_1)" stroke-width="1.17919" shape-rendering="crispEdges" />
                        <g filter="url(#filter5_d_0_1)">
                            <path d="M341.119 11.6181C342.732 11.6181 343.539 12.4027 343.539 13.9721V19.0761C343.539 19.6921 343.422 20.1834 343.187 20.5501C342.952 20.9167 342.564 21.1734 342.021 21.3201L339.491 21.9581V27.0181H337.467V11.6181H341.119ZM341.207 19.4501C341.456 19.3767 341.581 19.2154 341.581 18.9661V14.0161C341.581 13.7227 341.434 13.5761 341.141 13.5761H339.491V19.8681L341.207 19.4501ZM344.836 13.9281C344.836 13.1801 345.027 12.6081 345.408 12.2121C345.804 11.8161 346.383 11.6181 347.146 11.6181H348.664C349.412 11.6181 349.984 11.8161 350.38 12.2121C350.776 12.6081 350.974 13.1801 350.974 13.9281V24.7081C350.974 25.4561 350.776 26.0281 350.38 26.4241C349.984 26.8201 349.412 27.0181 348.664 27.0181H347.146C346.383 27.0181 345.804 26.8201 345.408 26.4241C345.027 26.0281 344.836 25.4561 344.836 24.7081V13.9281ZM346.86 24.6421C346.86 24.9354 347.007 25.0821 347.3 25.0821H348.51C348.803 25.0821 348.95 24.9354 348.95 24.6421V13.9941C348.95 13.7007 348.803 13.5541 348.51 13.5541H347.3C347.007 13.5541 346.86 13.7007 346.86 13.9941V24.6421ZM354.81 11.6181V27.0181H352.742V11.6181H354.81ZM358.921 11.6181L361.429 21.6721H361.561V11.6181H363.585V27.0181H361.187L358.723 17.3381H358.591V27.0181H356.567V11.6181H358.921ZM370.194 13.5761H368.39V27.0181H366.344V13.5761H364.54V11.6181H370.194V13.5761ZM372.936 21.4521V24.6201C372.936 24.9134 373.083 25.0601 373.376 25.0601H374.586C374.88 25.0601 375.026 24.9134 375.026 24.6201V20.7261C375.026 20.4767 374.909 20.3081 374.674 20.2201L372.254 19.3841C371.36 19.0467 370.912 18.3941 370.912 17.4261V13.9281C370.912 13.1801 371.11 12.6081 371.506 12.2121C371.902 11.8161 372.474 11.6181 373.222 11.6181H374.762C375.51 11.6181 376.082 11.8161 376.478 12.2121C376.874 12.6081 377.072 13.1801 377.072 13.9281V15.9961L375.048 16.5021V14.0161C375.048 13.7227 374.902 13.5761 374.608 13.5761H373.398C373.105 13.5761 372.958 13.7227 372.958 14.0161V17.1841C372.958 17.4481 373.076 17.6094 373.31 17.6681L375.73 18.5261C376.625 18.8341 377.072 19.4867 377.072 20.4841V24.7081C377.072 25.4561 376.874 26.0281 376.478 26.4241C376.082 26.8201 375.51 27.0181 374.762 27.0181H373.222C372.46 27.0181 371.88 26.8201 371.484 26.4241C371.103 26.0281 370.912 25.4561 370.912 24.7081V21.9581L372.936 21.4521Z" fill="white" />
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_diii_0_1" x="0.345289" y="-2.36571" width="60.8249" height="46.9803" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="3.48214" />
                            <feGaussianBlur stdDeviation="0.870536" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="1.37853" operator="erode" in="SourceAlpha" result="effect2_innerShadow_0_1" />
                            <feOffset dx="2.75706" />
                            <feGaussianBlur stdDeviation="3.44633" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="-2.0678" dy="-2.75706" />
                            <feGaussianBlur stdDeviation="1.37853" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="effect2_innerShadow_0_1" result="effect3_innerShadow_0_1" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="15" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                            <feBlend mode="normal" in2="effect3_innerShadow_0_1" result="effect4_innerShadow_0_1" />
                        </filter>
                        <filter id="filter1_d_0_1" x="9.88" y="8.00943" width="43.0626" height="27.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="3" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                        </filter>
                        <filter id="filter2_diii_0_1" x="60.9322" y="-2.75706" width="253.825" height="46.9803" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="3.48214" />
                            <feGaussianBlur stdDeviation="0.870536" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="1.37853" operator="erode" in="SourceAlpha" result="effect2_innerShadow_0_1" />
                            <feOffset dx="2.75706" />
                            <feGaussianBlur stdDeviation="3.44633" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="-2.0678" dy="-2.75706" />
                            <feGaussianBlur stdDeviation="1.37853" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="effect2_innerShadow_0_1" result="effect3_innerShadow_0_1" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="15" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                            <feBlend mode="normal" in2="effect3_innerShadow_0_1" result="effect4_innerShadow_0_1" />
                        </filter>
                        <filter id="filter3_d_0_1" x="167.467" y="7.61807" width="44.2403" height="27.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="3" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                        </filter>
                        <filter id="filter4_diii_0_1" x="314.932" y="-2.75706" width="74.8249" height="46.9803" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="3.48214" />
                            <feGaussianBlur stdDeviation="0.870536" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="1.37853" operator="erode" in="SourceAlpha" result="effect2_innerShadow_0_1" />
                            <feOffset dx="2.75706" />
                            <feGaussianBlur stdDeviation="3.44633" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_0_1" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dx="-2.0678" dy="-2.75706" />
                            <feGaussianBlur stdDeviation="1.37853" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0" />
                            <feBlend mode="normal" in2="effect2_innerShadow_0_1" result="effect3_innerShadow_0_1" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset />
                            <feGaussianBlur stdDeviation="15" />
                            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
                            <feBlend mode="normal" in2="effect3_innerShadow_0_1" result="effect4_innerShadow_0_1" />
                        </filter>
                        <filter id="filter5_d_0_1" x="331.467" y="7.61807" width="51.6055" height="27.4" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="2" />
                            <feGaussianBlur stdDeviation="3" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape" />
                        </filter>
                        <linearGradient id="paint0_linear_0_1" x1="3.36724" y1="1.68497" x2="60.3638" y2="6.32893" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#838383" />
                            <stop offset="0.136293" stop-color="#FDFDFD" />
                            <stop offset="0.33341" stop-color="#5E5E5E" />
                            <stop offset="0.485" stop-color="white" />
                            <stop offset="0.69" stop-color="#818181" />
                            <stop offset="0.9" stop-color="white" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_0_1" x1="67.2426" y1="1.29361" x2="292.757" y2="82.9943" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#838383" />
                            <stop offset="0.136293" stop-color="#FDFDFD" />
                            <stop offset="0.33341" stop-color="#5E5E5E" />
                            <stop offset="0.485" stop-color="white" />
                            <stop offset="0.69" stop-color="#818181" />
                            <stop offset="0.9" stop-color="white" />
                        </linearGradient>
                        <linearGradient id="paint2_linear_0_1" x1="318.193" y1="1.29361" x2="389.175" y2="8.52298" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#838383" />
                            <stop offset="0.136293" stop-color="#FDFDFD" />
                            <stop offset="0.33341" stop-color="#5E5E5E" />
                            <stop offset="0.485" stop-color="white" />
                            <stop offset="0.69" stop-color="#818181" />
                            <stop offset="0.9" stop-color="white" />
                        </linearGradient>
                    </defs>
                </svg>


                <table className={styles.leaderboardTable} >
                    {/* <thead>
                        <tr>
                            <th className={styles.rank}>Rank</th>
                            <th className={styles.name}>Name</th>
                            <th className={styles.point}>Points</th>
                        </tr>
                    </thead> */}

                    <tbody>
                        {leaderboardData.map((item,index) => (
                            <tr key={index}>
                                <td style={{ borderRadius: '10px 0px 0px 10px ' }}>{index+1}</td>
                                <td
                                    className='leaderBoardNameDepth'
                                // style={{ display: 'flex', justifyContent: 'flex-start' }}
                                >
                                    <img className={styles.roundImage}
                                        // src={item.image}
                                        src={char}
                                        alt={item.name} />
                                    <span className='px-1'> {item.name}</span>
                                </td>
                                <td style={{ borderRadius: '0px 10px 10px 0px ' }}>{item.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
