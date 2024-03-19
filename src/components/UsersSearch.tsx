import React, {useEffect, useState} from "react";
import {api} from "../services/api.ts";
import {User} from "../interfaces/User.ts";
import Pagination from "./shared/Pagination.tsx";
import {Pagination as PaginationInterface} from "../interfaces/Pagination.ts";
import UsersPosts from "./UsersPosts.tsx";
import Loader from "./shared/Loader.tsx";

const minSearchLength = 3

function UsersSearch(): React.JSX.Element {
    const [timeoutId, setTimeOutId] = useState<number | undefined>(undefined)
    const [users, setUsers] = useState<User[] | undefined>()
    const [posts, setPosts] = useState<number | undefined>(undefined)
    const [currentPage, setCurrentPage] = useState(1)
    const [usersPagination, setUsersPagination] = useState<PaginationInterface>({
        currentPage: undefined,
        total: undefined
    })
    const [searchingByName, setSearchingByName] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("")

    const [isLoading, setIsLoading] = useState(false)
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length < minSearchLength) {
            if (event.target.value.length === 0) {
                setCurrentPage(1)
                setSearchingByName(false)
            }

            return
        }

        setSearchQuery(event.target.value)
        setSearchingByName(true);
        setCurrentPage(1);
    }

    const fetchUsers = async (page: number, name?: string) => {
        setIsLoading(true)
        const {data, pagination} = await api.getPaginatedUsers(page, name)
        setUsers(data)
        setUsersPagination(pagination)
        setIsLoading(false)
    }

    useEffect(() => {
        if (!searchingByName) {
            fetchUsers(currentPage);
        } else {
            fetchUsers(currentPage, searchQuery);
        }
    }, [currentPage, searchingByName, searchQuery]);

    const handleWithTimeOut = (event: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(timeoutId)
        const timeOut = setTimeout(() => handleChange(event), 1000)
        setTimeOutId(timeOut)
    }

    const handleClick = async (id: number) => {
        setPosts(id)
    }

    const onNext = () => {
        setCurrentPage(currentPage + 1)
    }

    const onPrevious = () => {
        setCurrentPage(currentPage - 1)
    }

    return (
        <div className="w-1/3 m-auto my-5">
            <input
                className="p-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                type='text' placeholder="Search users by typing atleast 3 letters" onChange={handleWithTimeOut}/>

            <div className={`relative ${isLoading && "min-h-20"}`}>

                {isLoading && (
                    <Loader/>
                )}

                <div className="mt-5 border-solid border-4 rounded-lg">
                    <div className="flex p-2 border-solid border-b-4">
                        <div className="w-1/3">Name</div>
                        <div className="w-2/3">Email</div>
                    </div>
                    {users && users.length > 0 && users.map((user) => {
                        return (
                            <div className="flex p-2 cursor-pointer border-solid border-b-4" key={user.id} onClick={() => handleClick(user.id)}>
                                <div className="w-1/3">{user.name}</div>
                                <div className="w-2/3">{user.email}</div>
                            </div>
                        )
                    })}
                    <Pagination
                        current={usersPagination.currentPage}
                        total={usersPagination.total}
                        onNext={onNext}
                        onPrevious={onPrevious}
                    />
                </div>
            </div>
            <UsersPosts id={posts}/>
        </div>

    )
}

export default UsersSearch
