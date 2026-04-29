'use client'

import { Music, Headphones, Disc3, ExternalLink } from 'lucide-react'

const spotifySearch = (title, artist) =>
  `https://open.spotify.com/search/${encodeURIComponent(`${title} ${artist}`)}`

const allTracks = [
  {
    num: '01',
    title: 'Cruel Summer',
    artist: 'Taylor Swift',
    duration: '2:58',
    url: 'https://open.spotify.com/track/1BxfuPKGuaTgP7aM0Bbdwr',
  },
  {
    num: '02',
    title: 'Espresso',
    artist: 'Sabrina Carpenter',
    duration: '2:55',
    url: 'https://open.spotify.com/track/2qSkIjg1o9h3YT9RAgYN75',
  },
  {
    num: '03',
    title: 'Beautiful Things',
    artist: 'Benson Boone',
    duration: '3:00',
    url: spotifySearch('Beautiful Things', 'Benson Boone'),
  },
  {
    num: '04',
    title: "we can't be friends",
    artist: 'Ariana Grande',
    duration: '3:48',
    url: spotifySearch("we can't be friends", 'Ariana Grande'),
  },
  {
    num: '05',
    title: 'Miracle',
    artist: 'Calvin Harris & Ellie Goulding',
    duration: '3:32',
    url: spotifySearch('Miracle', 'Calvin Harris Ellie Goulding'),
  },
  {
    num: '06',
    title: "I'm Good (Blue)",
    artist: 'David Guetta & Bebe Rexha',
    duration: '2:55',
    url: 'https://open.spotify.com/track/4uUG5RXrOk84mYEfFvj3cK',
  },
  {
    num: '07',
    title: 'The Business',
    artist: 'Tiësto',
    duration: '2:44',
    url: spotifySearch('The Business', 'Tiësto'),
  },
]

export default function PersonalCard({ compact = false }) {
  if (compact) {
    const topTracks = allTracks.slice(0, 3)
    return (
      <div className="personal-card-compact">
        <div className="personal-compact-header">
          <div className="personal-icon-hero">
            <Headphones size={20} />
          </div>
          <div>
            <h3 className="personal-compact-title">Quer me conhecer?</h3>
            <p className="personal-compact-sub">Pop, eletrônica e energia 🎧</p>
          </div>
        </div>
        <div className="personal-compact-tracks">
          {topTracks.map((track) => (
            <a
              key={track.num}
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="personal-compact-track"
              title={`Ouvir "${track.title}" no Spotify`}
            >
              <Music size={14} />
              <div className="personal-compact-track-info">
                <span className="personal-compact-track-title">{track.title}</span>
                <span className="personal-compact-track-artist">{track.artist}</span>
              </div>
              <ExternalLink size={12} className="personal-compact-track-ext" />
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="personal-card">
      <div className="personal-info">
        <div className="personal-icon-hero">
          <Headphones size={28} />
        </div>
        <h3 className="personal-title">
          Quer me conhecer um pouco mais?
        </h3>
        <p className="personal-text">
          Marketing também é gente que se conecta com gente. 🎧 Dá uma espiada no que toca por
          aqui e embala as minhas tardes — quem sabe a gente combina nas referências também.
        </p>
        <p className="personal-text" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Pop, eletrônica e tudo que dá energia pro dia. Clica numa música pra abrir no Spotify.
        </p>
      </div>

      <div className="personal-tracks">
        <div className="personal-tracks-header">
          <span className="personal-tracks-header-title">
            <Disc3 size={14} />
            Top tracks
          </span>
          <span className="personal-tracks-header-count">{allTracks.length} músicas</span>
        </div>
        {allTracks.map((track) => (
          <a
            key={track.num}
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="personal-track"
            title={`Ouvir "${track.title}" no Spotify`}
          >
            <div className="personal-track-num">{track.num}</div>
            <div className="personal-track-icon">
              <Music size={16} />
            </div>
            <div className="personal-track-info">
              <div className="personal-track-title">{track.title}</div>
              <div className="personal-track-artist">{track.artist}</div>
            </div>
            <div className="personal-track-external">
              <ExternalLink size={14} />
            </div>
            <div className="personal-track-duration">{track.duration}</div>
          </a>
        ))}
      </div>
    </div>
  )
}
