import { useEffect, useState } from "react"
import Tooltip from '@material-ui/core/Tooltip';
import { socketService } from "../../services/socketService";
import { useSelector } from "react-redux";

export const Chat = ({ stationId }) => {

    const { loggedInUser } = useSelector(state => state.userModule)
    const [isChatOpen, setOpenChat] = useState(false)
    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    // const [scrollTop, setScroll] = useState(0)

    useEffect(() => {
        socketService.setup()
        socketService.emit('chat topic', stationId)
        socketService.on('chat addMsg', addMsg)
        return () => {
            socketService.off('chat addMsg', addMsg)
            socketService.terminate()
        }
    }, [])

    const onToggleChat = () => {
        setOpenChat(!isChatOpen)
    }

    const handleChange = (ev) => {
        const name = ev.target.name
        const value = ev.target.value
        setMsg(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const addMsg = (newMsg) => {
        setMsgs(prev => ([...prev, newMsg]))
    }

    const sendMsg = (ev) => {
        ev.preventDefault()
        const from = loggedInUser?.username || 'Guest'
        socketService.emit('chat newMsg', { from, txt: msg.txt })
        setMsg({ from: 'Me', txt: '' })
    }

    return (
        <>
            {!isChatOpen &&
                <Tooltip title="Chat" placement="top">
                    <button className="chat-btn" onClick={onToggleChat}>
                        <img src="https://res.cloudinary.com/basimgs/image/upload/v1621324315/chat_jjanao.png" alt="" />
                    </button></Tooltip>}
            {isChatOpen && <section className="chat-container flex space-between column">
                <button onClick={onToggleChat} className="close-btn">✕</button>
                <section className="msg-container">
                    <ul className="msgs flex column">
                        {msgs.map((msg, idx) => {
                            return <li className="msg" key={idx}>{`${msg.from}: ${msg.txt}`}</li>
                        })}
                    </ul>
                </section>
                <form onSubmit={sendMsg}>
                    <input type="text" name="txt" value={msg.txt} onChange={handleChange}
                        autoComplete="off" placeholder="Type Something..." />
                    <button className="send-btn"><img src="https://res.cloudinary.com/basimgs/image/upload/v1621492076/send_b65u2a.png" alt="" /></button>
                </form>
            </section>}
        </>
    )

}