import React from 'react'

const ThemeButton = ({toggleTheme, theme}) => {
    return <button onClick={() => toggleTheme(theme)}>Toggle Theme</button>
}

export default ThemeButton
