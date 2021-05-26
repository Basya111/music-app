import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export const ProfilePage = (props) => {

    const { loggedInUser } = useSelector(state => state.userModule)

    console.log(loggedInUser);
    return (
        <section className="profile-page">
            <h1>Hey {loggedInUser.username}!</h1>
            <h3>Your Stations:</h3>
            <section className="user-stations">
                {loggedInUser.stations && loggedInUser.stations.map(station => {
                    console.log(station);
                    return <Link to={`/station/${station._id}`} key={station._id} >
                    <div className="station-preview flex align-center">
                        <img className="radio-icon" src="https://res.cloudinary.com/basimgs/image/upload/v1621522790/radio_q8d9kt.png" alt="" />
                        <img className="station-img" src={station.stationImg} alt="" />
                        <p>{station.name}</p>
                    </div></Link>
                })}

            </section>
            <hr />
            <h3>Liked Stations</h3>
        </section>
    )
}