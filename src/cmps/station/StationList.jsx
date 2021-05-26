import { Link } from 'react-router-dom'

export const StationList = ({ stations }) => {

    return (
        <section className="station-list">
            {stations.map(station => {
                return <Link to={`/station/${station._id}`} key={station._id} >
                    <div className="station-preview" style={{
                        backgroundImage: `url(${station.stationImg})`
                    }} >
                        <div className="loader">
                            <img src="https://res.cloudinary.com/basimgs/image/upload/v1619446252/audio_cliqod.svg" alt="" />
                        </div>
                        <h3>{station.name}</h3>
                    </div>
                </Link>
            })}
        </section>
    )
}