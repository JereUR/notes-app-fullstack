import { useForm } from 'react-hook-form'

import stylesUtils from '../styles/utils.module.css'
import { User } from '../models/user'
import { LoginCredentials } from '../network/users_api'
import * as UsersApi from '../network/users_api'
import { Button, Form, Modal } from 'react-bootstrap'
import TextInputField from './form/TextInputField'

interface LoginModalProps {
  onDismiss: () => void
  onLoginSuccessful: (user: User) => void
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
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
      console.error(error)
      alert(error)
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
