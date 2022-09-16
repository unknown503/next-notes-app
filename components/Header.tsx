
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

export const Header = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    const RenderThemeChanger = () => {
        if (!mounted) return null;
        const currentTheme: string | undefined = (theme === "system") ? systemTheme : theme;

        if (currentTheme === "dark") {
            return (<SunIcon className="swap-on w-10 h-10 text-yellow-500 " role="button" onClick={() => setTheme('light')} />)
        } else {
            return (<MoonIcon className="swap-off w-10 h-10 text-gray-900 " role="button" onClick={() => setTheme('dark')} />)
        }
    }

    return (
        <div className="my-2 flex flex-row justify-between">
            <h1 className="text-3xl prose font-medium">Notes</h1>
            <RenderThemeChanger />
        </div>
    )
}
