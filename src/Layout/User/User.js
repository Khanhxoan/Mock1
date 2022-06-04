import { Button } from 'antd'
import React, { useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
// const ButtonReady = () => {
//     return(
//         <div>
//             <h1> Are you readyyyy !!!</h1>
//             <Button>Ready</Button>
//         </div>
//     )
// }

const User = () => {
    const navigate = useNavigate()
    const [ready, setReady] = useState("unReady")
    const handleReady = () => {
        setReady(ready === 'unReady'? 'ready' : 'unReady' )
        console.log(ready);
        
    }

    return (
        <>
        {
            (ready === 'unReady') ? (<Button onClick={handleReady}> Ready </Button>) :(<Outlet ready = {ready} />)
        }
        </>
        // <Outlet/>
    )
}

export default User