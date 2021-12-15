import React, { useEffect } from "react";

import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import FormGroup from "../FormGroup/FormGroup";

import { IAccessForm } from "../AccessSection";
import { REGEX } from "../../../../utils";
import axios from "axios";
import { API_BASEURL, URL_USERS } from "../../../../services/user";
import { Link, Navigate } from "react-router-dom";
import Section from "../../Section";


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

const RegisterForm: React.FC<IAccessForm> = ({ cancel, setCancel, loading, setLoading, currentUser, setCurrentUser, credentials, setCredentials, configModal }) => {

  useEffect(() => {
    const registerAbortController = new AbortController()
    const finish = () => { setCredentials(null); setLoading(false) }

    if (credentials !== undefined && credentials !== null && !cancel) {
      setLoading(true)

      axios.post(`${URL_USERS}/register`, credentials, {
        signal: registerAbortController.signal,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": API_BASEURL,
          "Access-Control-Allow-Credentials": "true",
        }
      })

        .then((response: any) => {
          if (response.status === 201 || response.status === 200) {
            setCurrentUser(response.data)
          } else {
            configModal("Error en registro", response?.data?.message || response?.data?.statusText)
          }
        })
        .catch(({ message, response }) => { configModal("Error en registro", response?.data?.message || response?.data?.statusText || message) })
        .finally(() => finish())
    }

    return () => {
      cancel && credentials !== undefined && credentials !== null && registerAbortController.abort()

      finish()
      setCancel(true)
    }
  }, [cancel, setCancel, credentials, setCredentials, setCurrentUser, configModal, setLoading])

  return (
    currentUser === undefined || loading
      ? <></>
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
              onSubmit={setCredentials}
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