import '../../index.css'
import {ClientOnly} from "./client.js";

export function generateStaticParams() {
    return [
        { slug: [''] },
        // { slug: '/main.jsx' },
    ]
}

export default function Page() {
    return <ClientOnly/>
}