import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../shared/hooks/http-hook'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import Map from '../../shared/components/UIElements/Map'
import Modal from '../../shared/components/UIElements/Modal'
import './ChatOpenai.css'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import { useAuth } from '../../shared/hooks/auth-hook'
import UserGuide from './UserGuide'

const OpenAIChatForm = (props) => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient()
  const [userInput, setUserInput] = useState('')
  const [assistantMessage, setAssistantMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [showMap, setShowMap] = useState(false)
  const [mapChatResponse, setMapChatResponse] = useState('')
  const [location, setLocation] = useState(null)
  const { token } = useAuth()

  useEffect(() => {
    let isMounted = true

    const getPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (isMounted) {
              setLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              })
            }
          },
          (error) => {
            console.error(error.message)
          },
        )
      }
    }

    getPosition()

    return () => {
      isMounted = false
    }
  }, [])

  const submitChat = async () => {
    try {
      if (!location) {
        console.error('Location is not available.')
        return
      }

      const response = await sendRequest(
        'http://localhost:5000/api/places/build',
        'POST',
        JSON.stringify({ userInput, location }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      )

      const chatResult = response

      const assistantMessage = chatResult[1] || 'No response'

      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: ' You',
          content: userInput,
        },
        {
          sender: ' Assistant',
          content: assistantMessage,
        },
      ])

      setAssistantMessage(assistantMessage)
    } catch (error) {
      console.error(error)
    }
  }

  const generateTravelTrack = async () => {
    try {
      const response = await sendRequest(
        'http://localhost:5000/api/places/travelTrack',
        'POST',
        JSON.stringify({ userInput }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      )

      setMapChatResponse(response.chatMessage || 'No chat response')

      setShowMap(false)
    } catch (error) {
      console.error(error)
    }
  }

  const openMapHandler = () => setShowMap(true)

  const closeMapHandler = () => setShowMap(false)

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <UserGuide />

      <div className="chat-container">
        <form className="chat-form">
          <span className="welcome" role="img" aria-label="waving hand">
            👋🇼‌🇪‌🇱‌🇨‌🇴‌🇲‌🇪‌
          </span>
          <h1>
            To Travel Track
            <span className="globe-emoji" role="img" aria-label="globe">
              🌍
            </span>
          </h1>

          <Input
            id="userInput"
            element="input"
            type="text"
            label="Ask me anything, and I'll do my best to help!"
            validators={[]}
            errorText="Please enter a valid message."
            onInput={(id, value, isValid) => setUserInput(value)}
            value={userInput}
            autoComplete="off"
            required
          />
          <Button type="button" onClick={submitChat} disabled={!userInput}>
            Submit
            {isLoading && <LoadingSpinner asOverlay />}
          </Button>
          <Button type="button" onClick={openMapHandler}>
            {isLoading ? 'Searching The Location...' : 'Enter Location'}
          </Button>
        </form>
        {showMap && (
          <Modal
            show={showMap}
            onCancel={closeMapHandler}
            header={props.address}
            contentClass="place-item__modal-content"
            footerClass="place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
          >
            <div className="map-container">
              <Map
                center={props.coordinates}
                zoom={16}
                onLocationClick={generateTravelTrack}
              />
            </div>
            <div className="map-chat-response">
              <p>{mapChatResponse}</p>
            </div>
          </Modal>
        )}
        {assistantMessage && (
          <form className="place-form chat-response">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${
                  message.sender.toLowerCase() === 'you'
                    ? 'user-message'
                    : 'assistant-message'
                }`}
              >
                <p className="chat-color">{`${message.sender}: ${message.content}`}</p>
              </div>
            ))}
          </form>
        )}
      </div>
    </React.Fragment>
  )
}

export default OpenAIChatForm
