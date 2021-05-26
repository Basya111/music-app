import { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/userAction'

export const Login = ({ history }) => {

    const { loggedInUser } = useSelector(state => state.userModule)
    const [user, setUser] = useState({})
    const [err, setErr] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        loadEnptyUser()
    }, [])

    const loadEnptyUser = () => {
        const emptyUser = { username: '', password: '' }
        setUser(emptyUser)
    }

    const handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        setUser(prevForm => ({
            ...prevForm,
            [field]: value
        }))
    }

    const onLogin = async (ev) => {
        ev.preventDefault()
        try {
            ev.preventDefault()
            await dispatch(login(user))
            console.log('user', loggedInUser);
            history.push('/station')
        } catch (err) {
            ev.preventDefault()
            history.push('/login')
            console.log('login', err);
            setErr({ err: 'no user' })
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
                <Typography component="h2" variant="h5">Login</Typography>
                <div className="err">{err}</div>
                <form style={{
                    width: '100%',
                    marginTop: '5px'
                }} >
                    <TextField
                        variant="outlined"
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
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={user.password}
                        onChange={handleChange}
                    />
                    {err && <span>err</span>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                        onClick={onLogin}
                    >Login </Button>
                    <Grid container>
                        <Grid item xs style={{ marginTop: '10px' }}>
                            <Link href="#" variant="body2">
                                Forgot password?</Link>
                        </Grid>
                        <Grid item style={{ marginTop: '10px' }}>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>

            </Box>
        </Container >
    );
}
