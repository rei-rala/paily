import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Link, Navigate } from "react-router-dom";


import Section from "../../Section";
import FormGroup from "../FormGroup/FormGroup";
import { IAccessForm } from "../AccessSection";

import { REGEX } from "../../../../utils";
import { authenticate } from "../../../../services/user";
import { AxiosResponse } from "axios";
import Loading from "../../../Loading/Loading";


const registerSchema = Yup.object().shape({
  email: Yup.string()
    .required('Requerido')
    .matches(REGEX.emailStronger, 'Ingrese un email válido')
    .min(5, 'Email muy corto')
    .max(50, 'Email muy largo'),
  password: Yup.string()
    .required('Requirida')
    .matches(REGEX.password, 'Ingrese al menos 6 caracters, con una letra mayúscula y un número')
    .min(6, 'Contraseña muy corta')
    .max(30, 'Contraseña  muy larga'),
})

const RegisterForm: React.FC<IAccessForm> = ({ currentUser, setCurrentUser, credentials, setCredentials, configModal }) => {
  const [loading, setLoading] = useState(false)
  const [cancel, setCancel] = useState(false)

  useEffect(() => {
    const registerAbortController = new AbortController()

    if (credentials !== undefined && credentials !== null && !cancel) {
      setLoading(true)

      authenticate(credentials, 'register', registerAbortController.signal)
        .then((response: AxiosResponse) => {
          console.log(response)
          if (response.status === 201 || response.status === 200) {
            setCurrentUser(response.data._doc)
          } else {
            configModal("Error en registro", response?.data?.message || response?.data?.statusText)
          }
        })
        .catch(({ message, response }) => { configModal("Error en registro", response?.data?.message || response?.data?.statusText || message) })
        .finally(() => { setCredentials(null); setLoading(false); setCancel(false) })
    }

    return () => {
      cancel && credentials !== undefined && credentials !== null && registerAbortController.abort()

      setCancel(true)
    }
  }, [cancel, setCancel, credentials, setCredentials, setCurrentUser, configModal, setLoading])

  return (
    currentUser === undefined || loading
      ? <Loading />
      : currentUser
        ? <Navigate to='/main' />
        : <Section title="Registro" >
          <div className="loginFormContainer">
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={registerSchema}
              onSubmit={(creds) => {
                setCancel(false)
                setCredentials(creds)
              }}
            >
              {({ errors, touched }) => (
                <Form>

                  <FormGroup
                    element={<Field name='email' type='email' placeholder='Email' maxLength={50} />}
                    error={errors.email}
                    touch={touched.email}
                  />

                  <FormGroup
                    element={<Field type='password' name='password' placeholder='Contraseña' maxLength={30} />}
                    error={errors.password}
                    touch={touched.password}
                  />

                  <button type='submit'>Registrar</button>

                </Form>
              )}
            </Formik >

            <div className="switchSection">
              {currentUser !== undefined && <span> Posees cuenta? <Link to='/login'> Iniciar sesion </Link></span>}
            </div>
          </div >
        </Section >
  )
}
export default RegisterForm;