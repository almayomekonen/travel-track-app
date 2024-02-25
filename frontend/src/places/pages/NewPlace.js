import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import ImageUpload from '../../shared/components/FormElements/imageUpload'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/util/validators'
import { useForm } from '../../shared/hooks/form-hook'
import { useHttpClient } from '../../shared/hooks/http-hook'
import { AuthContext } from '../../shared/context/auth-context'
import './PlaceForm.css'

const NewPlace = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false,
  )

  const history = useHistory()

  const placeSubmitHandler = async (event) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('title', formState.inputs.title.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('address', formState.inputs.address.value)
    formData.append('image', formState.inputs.image.value)
    try {
      await sendRequest('http://localhost:4000/api/places', 'POST', formData, {
        Authorization: 'Bearer ' + auth.token,
      })

      history.push(`/${auth.userId}/places`)
    } catch (err) {}
  }

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error && error.message !== 'Could not find place') {
    return (
      <div className="center">
        <Card>
          <h2>Error occurred!</h2>
        </Card>
      </div>
    )
  }

  return (
    <React.Fragment>
      <p className="newPlace-description">
        Capture the Journey: Share Your Travel Moment with Image, Title, and
        Description!
      </p>

      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE(6)]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          center
          id="image"
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  )
}

export default NewPlace
