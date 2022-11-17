import { createContext, useState, useEffect } from "react";
import { fetchUser } from '../utils/fetchUser'
import { client } from "../client";
import { userQuery } from "../utils/data";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)
    const userInfo = fetchUser()

    useEffect(() => {
        const query = userQuery(userInfo?.sub)
        console.log(query)
        client.fetch(query)
            .then((data) => {
                console.log(data)
                setUser(data[0])
            })
    }, []);

    function removeUser() {
        localStorage.removeItem('user')
    }

    return (
        <UserContext.Provider value={{ user, removeUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;