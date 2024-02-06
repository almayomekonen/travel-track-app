import React, { useEffect, useState, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'
import { useAuth } from '../../hooks/auth-hook'
import './Map.css'

const Map = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [processDone, setProcessDone] = useState(false)
  const { token } = useAuth()
  const mapRef = useRef(null)
  useEffect(() => {
    const getPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(loadMap, function () {
          alert('Not work / internet connection')
        })
      }
    }

    const loadMap = (position) => {
      const { latitude, longitude } = position.coords

      const coords = [latitude, longitude]

      if (!mapRef.current) {
        const map = L.map('map').setView(coords, 13)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map)

        mapRef.current = map

        map.on('click', async (event) => {
          const { lat, lng } = event.latlng
          setIsLoading(true)
          try {
            const response = await axios.post(
              'http://localhost:5000/api/places/travelTrack',
              {
                latitude: lat,
                longitude: lng,
              },
              {
                headers: {
                  Authorization: 'Bearer ' + token,
                  'Content-Type': 'application/json',
                },
              },
            )

            const chatMessage = response.data.chatMessage

            L.popup().setLatLng([lat, lng]).setContent(chatMessage).openOn(map)

            setIsLoading(false)
            setProcessDone(true)

            const containerDiv = document.createElement('div')
            containerDiv.className = 'container'
            const chatDiv = document.createElement('div')
            chatDiv.className = 'generatedMessage'
            chatDiv.innerText = chatMessage
            containerDiv.appendChild(chatDiv)
            document.body.appendChild(containerDiv)
            containerDiv.scrollIntoView({ behavior: 'smooth' })

            if (props.onMapClick) {
              props.onMapClick(chatMessage)
            }
          } catch (error) {}
        })
      }
    }

    getPosition()
  }, [token, props])

  return (
    <React.Fragment>
      <div id="map" style={{ height: '270px' }}></div>
      <div className="center">
        {isLoading && <LoadingSpinner />}
        {isLoading && <p className="process">Processing your Trip...</p>}
        {processDone && (
          <p className="process">Processed successfully. Have a great time!</p>
        )}
      </div>
    </React.Fragment>
  )
}

export default Map
