import { Outlet } from "@tanstack/react-router"
import { Header } from "../../shared/ui/Header/Header"
import styles from "./RootLayout.module.css"

export const RootLayout = () => (
    <>
        <Header renderAccountBar={() => <div>Account</div>} />
        <div className={styles.container}>
            <Outlet />
        </div>
    </>
)