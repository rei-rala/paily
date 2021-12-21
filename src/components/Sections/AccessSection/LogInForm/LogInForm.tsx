import React, { useEffect } from "react";
import { AxiosResponse } from "axios";
import { Link, Navigate } from "react-router-dom";

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'


import Section from "../../Section";
import LoginFormGroup from "../FormGroup/FormGroup";
import { IAccessForm } from "../AccessSection";
import { authenticate } from "../../../../services/user";


const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email requerido')
    .min(5, 'Email muy corto')
    .max(50, 'Email muy largo'),
  password: Yup.string()
    .required('Contraseña requirida')
    .min(6, 'Contraseña muy corta')
    .max(30, 'Contraseña  muy larga'),
})


const LoginForm: React.FC<IAccessForm> = ({ cancel, setCancel, loading, setLoading, currentUser, setCurrentUser, credentials, setCredentials, configModal }) => {

  useEffect(() => {
    const loginAbortController = new AbortController()
    const finish = () => { setCredentials(null); setLoading(false) }

    if (credentials !== undefined && credentials !== null && !cancel) {
      setLoading(true)


      authenticate(credentials, 'login', loginAbortController.signal)
        .then((response: AxiosResponse) => {
          if (response.status === 200 && response?.data !== undefined) {
            setCurrentUser(response.data)
          } else {
            configModal("Error al iniciar sesion", response?.data?.message || response?.data?.statusText + " WTF Unexpected")
          }
        })
        .catch(({ message, response }) => { configModal("Error al iniciar sesion", response?.data?.message || response?.data?.statusText || message) })
        .finally(() => finish())
    }

    return () => {
      cancel && credentials !== undefined && credentials !== null && loginAbortController.abort()
      finish()
      setCancel(true)
    }
  }, [cancel, setCancel, credentials, setCredentials, setCurrentUser, configModal, setLoading])

  return (
    currentUser === undefined || loading
      ? <></>
      : currentUser
        ? <Navigate to='/main' />
        : <Section title="Iniciar sesión">
          <div className="loginFormContainer">
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={loginSchema}
              onSubmit={setCredentials}
            >
              {({ errors, touched }) => (
                <Form>

                  <LoginFormGroup
                    element={<Field name='email' placeholder='Email' maxLength={50} />}
                    error={errors.email}
                    touch={touched.email}
                  />

                  <LoginFormGroup
                    element={<Field type='password' name='password' placeholder='Contraseña' maxLength={30} />}
                    error={errors.password}
                    touch={touched.password}
                  />

                  <button type='submit'>Iniciar</button>

                </Form>
              )}
            </Formik >

            <div className="switchSection">
              {currentUser !== undefined && <span> No tienes cuenta? <Link to='/register'> Registrarse </Link></span>}
            </div>
          </div >
        </Section>
  )
}

export default LoginForm