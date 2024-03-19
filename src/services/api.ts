import {getPaginatedUsersEndpoint, getUsersPosts} from "./endpoints.ts";
import {User, UserPost} from "../interfaces/User.ts";
import {Pagination} from "../interfaces/Pagination.ts";
import {getPaginationData} from "./pagination.ts";

export const api = {
    getPaginatedUsers: async (page: number, name = ''): Promise<{ pagination: Pagination, data: User[] }> => {
        try {
            const response = await fetch(getPaginatedUsersEndpoint(page, name));

            const data = await response.json();

            return {
                pagination: getPaginationData(response.headers),
                data
            };
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch paginated users');
        }
    },
    getUsersPosts: async (id: number, page: number): Promise<{ pagination: Pagination, data: UserPost[]}> => {
        try {
            const response = await fetch(getUsersPosts(id, page));
            const data = await response.json();

            return {
                pagination: getPaginationData(response.headers),
                data
            };
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch paginated users');
        }
    }
}
