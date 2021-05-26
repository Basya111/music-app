import { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../store/actions/userAction';


export const Signup = ({history}) => {

    const [user, setUser] = useState('')
    const [err, setErr] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        loadEnptyUser()
    }, [])

    const loadEnptyUser = () => {
        const emptyUser = { username: '', password: '', password: '' }
        setUser(emptyUser)
    }

    const handleChange = ({ target }) => {
        const field = target.name
        const value = (target.type === 'number') ? +target.value : target.value
        setUser(prevForm => ({
            ...prevForm,
            [field]: value
          }))
    }

    const onSignUpUser = async (ev) => {
        ev.preventDefault()
        try {
            await dispatch(signup(user))
            history.push('/station')
        } catch (err) {
            setErr({ err })
        }
    }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div style={{
                marginTop: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Avatar style={{
                    margin: '10px',
                    backgroundColor: 'blue',
                }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h2" variant="h5"></Typography>
                <div className="err">{err && err.txt}</div>
                <form onSubmit={onSignUpUser} style={{
                    width: '100%',
                    marginTop: '5px'
                }} >
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="Username"
                        label="Username"
                        name="username"
                        autoFocus
                        value={user.username}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        id="fullname"
                        label="Full Name"
                        name="fullname"
                        value={user.fullname}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="filled"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                    >
                        Sign Up
          </Button>
                </form>
            </div>
            <Box mt={8}>

            </Box>
        </Container >
    );
}
