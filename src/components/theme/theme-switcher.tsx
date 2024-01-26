"use client";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {

    const { theme, setTheme } = useTheme()

    return (<div className="space-x-1">
        <h6>The current theme is : { theme }</h6>
        <button className="border-solid border-2 border-sky-500 rounded-lg p-1" onClick={() => setTheme("light")}>Light Mode</button>
        <button className="border-solid border-2 border-sky-500 rounded-lg p-1" onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>);

};

export default ThemeSwitcher;