import Image from "next/image"
import Link from "next/link"
import { CiLogout } from "react-icons/ci"
import { LogoutButton, SidebarItem } from "@/components"
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from "react-icons/io5"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const menuItem = [
    {
        icon: <IoCalendarOutline size={20}/>,
        title: 'Dashboard',
        path: '/dashboard',
    },
    {
        icon: <IoCheckboxOutline size={20}/>,
        title: 'Rest TODOS',
        path: '/dashboard/rest-todos',
    },
    {
        icon: <IoListOutline size={20}/>,
        title: 'Server Actions',
        path: '/dashboard/server-todos',
    },
    {
        icon: <IoCodeWorkingOutline size={20}/>,
        title: 'Cookies',
        path: '/dashboard/cookies',
    },
    {
        icon: <IoBasketOutline size={20}/>,
        title: 'Products',
        path: '/dashboard/products',
    },
    {
        icon: <IoPersonOutline size={20}/>,
        title: 'Profile',
        path: '/dashboard/profile',
    },
]

export const Sidebar = async () => {

    const session = await getServerSession(authOptions);

    const userName = session?.user?.name ?? 'No name';

    const avatarUrl = (session?.user?.image) ? session.user.image : '/profile_pic.png';

    const userRoles = session?.user?.roles ?? ['user'];

    return (
        <>
            <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
                <div>
                    <div className="-mx-6 px-6 py-4">
                        <Link href="/dashboard" title="home">
                            <Image src="https://www.svgrepo.com/show/164986/logo.svg" 
                                className="w-10" 
                                width={10}
                                height={10}
                                alt="tailus logo" />
                        </Link>
                    </div>

                    <div className="mt-8 text-center">
                        <Image src={avatarUrl} 
                            alt="Profile Picture" 
                            width={650}
                            height={650}
                            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
                        <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                        <span className="hidden text-gray-400 lg:block capitalize">{userRoles.join(', ')}</span>
                    </div>

                    <ul className="space-y-2 tracking-wide mt-8">
                        {
                            menuItem.map(item => (
                                <SidebarItem key={item.path} {...item} />
                            ))
                        }
                    </ul>

                </div>

                <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                    <LogoutButton />
                </div>
            </aside>
        </>

    )
}
