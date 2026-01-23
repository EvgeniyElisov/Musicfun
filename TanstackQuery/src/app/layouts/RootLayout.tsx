import { Outlet } from "@tanstack/react-router"
import { AccountBar } from "../../features/auth/ui/AccountBar"
import { Header } from "../../shared/ui/Header/Header"
import styles from "./RootLayout.module.css"

export const RootLayout = () => (
    <>
        <Header renderAccountBar={() => <AccountBar />} />
        <div className={styles.container}>
            <Outlet />
        </div>
    </>
)