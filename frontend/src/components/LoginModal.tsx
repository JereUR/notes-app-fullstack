import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Alert, Button, Form, Modal } from 'react-bootstrap'

import stylesUtils from '../styles/utils.module.css'
import { User } from '../models/user'
import { LoginCredentials } from '../network/users_api'
import * as UsersApi from '../network/users_api'
import TextInputField from './form/TextInputField'
import { UnauthorizedError } from '../errors/http_errors'

interface LoginModalProps {
  onDismiss: () => void
  onLoginSuccessful: (user: User) => void
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginCredentials>()

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await UsersApi.login(credentials)
      onLoginSuccessful(user)
      onDismiss()
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message)
      } else {
        alert(error)
      }
      console.error(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={stylesUtils.width100}
          >
            Log In
            {isSubmitting && (
              <span className="spinner-border spinner-border-sm ml-2"></span>
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default LoginModal
