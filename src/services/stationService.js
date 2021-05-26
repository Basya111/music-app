import { httpService } from './httpService.js'
import { songsService } from './songsService.js'

import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

export const stationService = {
    query,
    remove,
    save,
    getStationById,
    getSongsSearch,
    getSongIdxById,
    getEmptyStation,
    debounce
}

// const baseUrl = 'http://localhost:3030/station'

async function query() {
    // var res = await axios.get(baseUrl)
    var res = await httpService.get(`station`)
    console.log(res);
    return res
}

function remove(stationId) {
    return httpService.delete(`station/${stationId}`)
}

async function save(station) {
    console.log('service front', station);
    if (station._id) {
        return httpService.put(`station/${station._id}`, station)
        // const savedStation = await axios.put(`${baseUrl}/${station._id}`, station)
        // return savedStation.data
    } else {
        return httpService.post('station', station)
        // return await axios.post(`${baseUrl}/${station}`, station)
    }
}

async function getStationById(stationId) {
    return httpService.get(`station/${stationId}`)
    // const res = await axios.get(`${baseUrl}/${stationId}`)
    // return res.data
}

function getEmptyStation(){
    return {
        name: '',
        description: '',
        stationImg: '',
        tags: []
    }
}

function getSongIdxById(station, songId) {
    try {
        // const station = await getStationById(boardId)
        const songIdx = station.songs.findIndex(song => song.id === songId)
        return songIdx
    } catch (err) {
        console.log('err stationService GET SONG IDX BY ID', err)
    }
}

async function getSongsSearch(val) {
    // const songs = await songsService.getVideos(val)
    // const updatedSongs = songs.map(song => {
    //     return songsService.refactorVideo(song)
    // })
    console.log('checking this val', val);
    const updatedSongs = gSongsTemp.items.map(song => {
        return songsService.refactorVideo(song)
    })
    return updatedSongs
}

function debounce(func, wait) {
    let timeout;
  
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
  
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };


var gSongsTemp = {
    kind: "youtube#searchListResponse",
    etag: "qVIRl5ZdG-1_ZKZHxpWtd_ODbyA",
    nextPageToken: "CAoQAA",
    regionCode: "IL",
    pageInfo: {
        totalResults: 1000000,
        resultsPerPage: 10
    },
    items: [
        {
            kind: "youtube#searchResult",
            etag: "Rag-p6fHRAUaeqgNQQYjx-_ml_s",
            id: {
                kind: "youtube#video",
                videoId: "yJyClObyUOs"
            },
            snippet: {
                publishedAt: "2019-04-03T14:00:10Z",
                channelId: "UCVmfxGk1DWcb8AUAOpsD8-A",
                title: "Best The Beatles Songs Collection - The Beatles Greatest Hits Full Album",
                description: "If you have any problem with copyright issues, please CONTACT US DIRECTLY before doing anything, or question please write to me in email.",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/yJyClObyUOs/default.jpg",
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/yJyClObyUOs/mqdefault.jpg",
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/yJyClObyUOs/hqdefault.jpg",
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: "Greatest Hits Music",
                liveBroadcastContent: "none",
                publishTime: "2019-04-03T14:00:10Z"
            }
        },
        {
            kind: "youtube#searchResult",
            etag: "hQzH-i_eIE2on0oIEetZrmfwDds",
            id: {
                kind: "youtube#video",
                videoId: "NCtzkaL2t_Y"
            },
            snippet: {
                publishedAt: "2015-12-14T08:00:00Z",
                channelId: "UC4dqLAF7yT-_DqeYisQ001w",
                title: "The Beatles - Don&#39;t Let Me Down",
                description: "Written by John as an expression of his love for Yoko Ono, the song is heartfelt and passionate. As John told Rolling Stone magazine in 1970, “When it gets ...",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/NCtzkaL2t_Y/default.jpg",
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/NCtzkaL2t_Y/mqdefault.jpg",
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/NCtzkaL2t_Y/hqdefault.jpg",
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: "TheBeatlesVEVO",
                liveBroadcastContent: "none",
                publishTime: "2015-12-14T08:00:00Z"
            }
        },
        {
            kind: "youtube#searchResult",
            etag: "ngpxvM8kbQgY5Qhey2Rp10UO9Qw",
            id: {
                kind: "youtube#video",
                videoId: "A_MjCqQoLLA"
            },
            snippet: {
                publishedAt: "2015-12-07T08:00:00Z",
                channelId: "UC4dqLAF7yT-_DqeYisQ001w",
                title: "The Beatles - Hey Jude",
                description: "Hey Jude topped the charts in Britain for two weeks and for 9 weeks in America, where it became The Beatles longest-running No.1 in the US singles chart as ...",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/A_MjCqQoLLA/default.jpg",
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/A_MjCqQoLLA/mqdefault.jpg",
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/A_MjCqQoLLA/hqdefault.jpg",
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: "TheBeatlesVEVO",
                liveBroadcastContent: "none",
                publishTime: "2015-12-07T08:00:00Z"
            }
        },
        {
            kind: "youtube#searchResult",
            etag: "e1-Dfp0LP9B6PguGbRNOrA8R9p8",
            id: {
                kind: "youtube#video",
                videoId: "wfX2eJXx5v8"
            },
            snippet: {
                publishedAt: "2019-03-21T14:00:08Z",
                channelId: "UCVmfxGk1DWcb8AUAOpsD8-A",
                title: "The Beatles Greatest Hits Full Album - Best Beatles Songs Collection",
                description: "If you have any problem with copyright issues, please CONTACT US DIRECTLY before doing anything, or question please write to me in email.",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/wfX2eJXx5v8/default.jpg",
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/wfX2eJXx5v8/mqdefault.jpg",
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/wfX2eJXx5v8/hqdefault.jpg",
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: "Greatest Hits Music",
                liveBroadcastContent: "none",
                publishTime: "2019-03-21T14:00:08Z"
            }
        },
        {
            kind: "youtube#searchResult",
            etag: "n7XhLIQWl-F6F-Op9TWRCEJVIkQ",
            id: {
                kind: "youtube#video",
                videoId: "ukhpsC7Nng0"
            },
            snippet: {
                publishedAt: "2020-08-17T12:00:28Z",
                channelId: "UCVmfxGk1DWcb8AUAOpsD8-A",
                title: "The Beatles Greatest Hits Full Album 2020",
                description: "The Beatles Greatest Hits Full Album 2020 © Follow : The Beatles Official site: http://www.thebeatles.com Facebook: https://www.facebook.com/thebeatles/ ...",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/ukhpsC7Nng0/default.jpg",
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/ukhpsC7Nng0/mqdefault.jpg",
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/ukhpsC7Nng0/hqdefault.jpg",
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: "Greatest Hits Music",
                liveBroadcastContent: "none",
                publishTime: "2020-08-17T12:00:28Z"
            }
        },
        {
            kind: "youtube#searchResult",
            etag: "Tsd_HCz9CNq64iMGFrxPM564f78",
            id: {
                kind: "youtube#video",
                videoId: "2Q_ZzBGPdqE"
            },
            snippet: {
                publishedAt: "2018-06-21T15:00:01Z",
                channelId: "UC4dqLAF7yT-_DqeYisQ001w",
                title: "The Beatles - Help!",
                description: "Music video by The Beatles performing Help!. © 2015 Calderstone Productions Limited (a division of Universal Music Group) / Subafilms Ltd ...",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/2Q_ZzBGPdqE/default.jpg",
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/2Q_ZzBGPdqE/mqdefault.jpg",
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/2Q_ZzBGPdqE/hqdefault.jpg",
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: "TheBeatlesVEVO",
                liveBroadcastContent: "none",
                publishTime: "2018-06-21T15:00:01Z"
            }
        },
        {
            kind: "youtube#searchResult",
            etag: "bIaR512WynWd40dHrEyaPZoqLXs",
            id: {
                kind: "youtube#video",
                videoId: "45cYwDMibGo"
            },
            snippet: {
                publishedAt: "2018-06-21T15:00:01Z",
                channelId: "UC4dqLAF7yT-_DqeYisQ001w",
                title: "The Beatles - Come Together",
                description: "Music video by The Beatles performing Come Together. © 2015 Calderstone Productions Limited (a division of Universal Music Group) / Apple Films Ltd.",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/45cYwDMibGo/default.jpg",
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/45cYwDMibGo/mqdefault.jpg",
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/45cYwDMibGo/hqdefault.jpg",
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: "TheBeatlesVEVO",
                liveBroadcastContent: "none",
                publishTime: "2018-06-21T15:00:01Z"
            }
        },
        {
            kind: "youtube#searchResult",
            etag: "DxFRH0l61MsH5QmVokovCs4jxeo",
            id: {
                kind: "youtube#video",
                videoId: "UelDrZ1aFeY"
            },
            snippet: {
                publishedAt: "2017-12-15T16:14:30Z",
                channelId: "UC4dqLAF7yT-_DqeYisQ001w",
                title: "The Beatles - Something",
                description: "Music video by The Beatles performing Something. (C) 2015 Calderstone Productions Limited (a division of Universal Music Group) / Apple Films Ltd.",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/UelDrZ1aFeY/default.jpg",
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/UelDrZ1aFeY/mqdefault.jpg",
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/UelDrZ1aFeY/hqdefault.jpg",
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: "TheBeatlesVEVO",
                liveBroadcastContent: "none",
                publishTime: "2017-12-15T16:14:30Z"
            }
        },
        {
            kind: "youtube#searchResult",
            etag: "nmhJOOrVN_YhCo71xPWpg67qrlk",
            id: {
                kind: "youtube#video",
                videoId: "HtUH9z_Oey8"
            },
            snippet: {
                publishedAt: "2018-05-04T07:00:00Z",
                channelId: "UC4dqLAF7yT-_DqeYisQ001w",
                title: "The Beatles - Strawberry Fields Forever",
                description: "Music video by The Beatles performing Strawberry Fields Forever. © 2015 Calderstone Productions Limited (a division of Universal Music Group) / Subafilms Ltd ...",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/HtUH9z_Oey8/default.jpg",
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/HtUH9z_Oey8/mqdefault.jpg",
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/HtUH9z_Oey8/hqdefault.jpg",
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: "TheBeatlesVEVO",
                liveBroadcastContent: "none",
                publishTime: "2018-05-04T07:00:00Z"
            }
        },
        {
            kind: "youtube#searchResult",
            etag: "TqjWagfRNOnc7Nsdv8zy1lB2sN8",
            id: {
                kind: "youtube#video",
                videoId: "KQetemT1sWc"
            },
            snippet: {
                publishedAt: "2019-09-26T16:00:11Z",
                channelId: "UC4dqLAF7yT-_DqeYisQ001w",
                title: "The Beatles - Here Comes The Sun (2019 Mix)",
                description: "Abbey Road presented with new mixes in stereo, 5.1 surround, and Dolby Atmos; expanded with previously unreleased session recordings and demos.",
                thumbnails: {
                    default: {
                        url: "https://i.ytimg.com/vi/KQetemT1sWc/default.jpg",
                        width: 120,
                        height: 90
                    },
                    medium: {
                        url: "https://i.ytimg.com/vi/KQetemT1sWc/mqdefault.jpg",
                        width: 320,
                        height: 180
                    },
                    high: {
                        url: "https://i.ytimg.com/vi/KQetemT1sWc/hqdefault.jpg",
                        width: 480,
                        height: 360
                    }
                },
                channelTitle: "TheBeatlesVEVO",
                liveBroadcastContent: "none",
                publishTime: "2019-09-26T16:00:11Z"
            }
        }
    ]
}