import { Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { History } from "./pages/History"
import { Defautlayout } from "./layouts/DefaultLayout"

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Defautlayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />

            </Route>
        </Routes>
    )
}