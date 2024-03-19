import React, {useEffect, useState} from "react";
import Pagination from "./shared/Pagination.tsx";
import {UserPost} from "../interfaces/User.ts";
import {api} from "../services/api.ts";
import {Pagination as PaginationInterface} from "../interfaces/Pagination.ts";
import Loader from "./shared/Loader.tsx";

interface UsersPostsProps {
    id?: number
}

function UsersPosts({id}: UsersPostsProps): React.JSX.Element {
    const [posts, setPosts] = useState<UserPost[] | undefined>(undefined)
    const [postsPagination, setPostsPagination] = useState<PaginationInterface>({
        currentPage: undefined,
        total: undefined
    })
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setCurrentPage(1);
    }, [id])

    useEffect(() => {
        if (id) {
            fetchPosts(id, currentPage);
        }
    }, [id, currentPage])

    const fetchPosts = async  (id: number, page: number) => {
        setIsLoading(true)
        const {data, pagination} = await api.getUsersPosts(id, page)
        setPosts(data)
        setPostsPagination(pagination)
        setIsLoading(false)
    }
    const onNext = () => {
        setCurrentPage(currentPage + 1)
    }

    const onPrevious = () => {
        setCurrentPage(currentPage - 1)
    }

    return (
        <div className={`relative ${isLoading && "min-h-20"}`}>
            {isLoading && (
                <Loader/>
            )}
            {posts && posts.length > 0 ? (
                    <div className="mt-5 border-solid border-4 rounded-lg">
                        {posts.map((post) => {
                            return (
                                <div className="p-2 border-solid border-b-4" key={post.id}>
                                    <h2 className="text-xl bold">{post.title}</h2>
                                    <p>{post.body}</p>
                                </div>
                            )
                        })}
                        <Pagination
                            current={postsPagination.currentPage}
                            total={postsPagination.total}
                            onNext={onNext}
                            onPrevious={onPrevious}
                        />
                    </div>
                ) :
                posts && posts.length === 0 ? (
                    <div className="mt-5">User doesn't have posts</div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

export default UsersPosts
