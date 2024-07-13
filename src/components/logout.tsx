function Logout() {
    const handleLogout = async () =>  {
        try {
            const res = await fetch('/api/auth/logout', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }
            })

            const data = await res.json()
            localStorage.removeItem('user-threads');
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <button onClick={handleLogout}>Logout</button>
    )
}

export default Logout