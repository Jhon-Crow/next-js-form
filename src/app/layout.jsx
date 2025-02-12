export default function RootLayout({ children }) {
    return (
        <html lang="ru">
        <head>
            <title>Vite + React</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        </head>
        <body>
        <div id="root">
            {children}
        </div>
        </body>
        </html>
    )
}