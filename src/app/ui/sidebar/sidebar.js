'use client'
import Image from "next/image"
import styles from '@/app/ui/sidebar/sidebar.module.css'
import {
    MdAttachMoney,
    MdDashboard,
    MdShoppingBag,
    MdSupervisedUserCircle
} from "react-icons/md";
import { TbMoneybag, TbReportSearch } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { IoMdHelpCircle } from "react-icons/io";
import MenuLink from "./menuLink/menuLink";
import { url } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateUser } from "@/app/Redux/userSlice";

const menuItems = [
    {
        title: "Pages",
        list: [
            {
                title: "Dashboard",
                path: "/dashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Users",
                path: "/dashboard/users",
                icon: <MdSupervisedUserCircle />,
            },
            {
                title: "Products",
                path: "/dashboard/products",
                icon: <MdShoppingBag />,
            },
            {
                title: "Transactions",
                path: "/dashboard/transactions",
                icon: <MdAttachMoney />
            },
        ],
    },
    {
        title: "Analytics",
        list: [
            {
                title: "Revenue",
                path: "",
                icon: <TbMoneybag />,
            },
            {
                title: "Reports",
                path: "",
                icon: <TbReportSearch />,
            },
            {
                title: "Teams",
                path: "",
                icon: <RiTeamFill />,
            }
        ],
    },
    {
        title: "User",
        list: [
            {
                title: "Setting",
                path: "",
                icon: <IoMdSettings />,
            },
            {
                title: "Help",
                path: "",
                icon: <IoMdHelpCircle />,
            },
        ],
    },
]



const Sidebar = () => {

    const route=useRouter();
    const dispatch=useDispatch();
    const logout= async() => {
        const res= await fetch(`${url}api/v1/auth`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch(updateUser(''));
        route.push('/sign-in');
    }

    return (
        <div className={styles.container}>
            <div className={styles.user}>
                <Image
                    className={styles.userImage}
                    src="https://i.pinimg.com/originals/0b/92/c1/0b92c1ba5ae239c314ba2ec1dab936ec.png"
                    alt="user image"
                    width="70"
                    height="70" />
                <div className={styles.userDetail}>
                    <span className={styles.username}>Admin</span>
                    <span className={styles.userTitle}>Dashboard</span>
                </div>
            </div>
            <ul className={styles.list}>
                {menuItems.map((item) => (
                    <li key={item.title}>
                        <span className={styles.item}>{item.title}</span>
                        {
                            item.list.map((i) => (
                                <MenuLink item={i} key={i.title} />
                            ))
                        }
                    </li>
                ))}
                <li>
                    <button className="w-full" onClick={logout}>
                    <MenuLink item={{title: "Logout", path: "", icon: <IoLogOutOutline />,}}/>
                    </button>
                </li>
            </ul>


        </div>
    )
}

export default Sidebar
