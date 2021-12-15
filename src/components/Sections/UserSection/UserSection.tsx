import React, { useContext, useEffect, useState } from 'react'
import { User } from "../../../contexts/UserContext";

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'

import Section from '../Section'

const userConfiguration = Yup.object().shape({
  userName: Yup.string()
    .required('Nombre requerido')
    .max(30, 'Nombre muy largo'),
  userImage: Yup.string(),
})

const editProfile = (x: any) => console.log(x)

const UserSection = () => {
  const { currentUser } = useContext(User)

  const [tempUserName, setTempUserName] = useState('')
  const [tempUserImage, setTempUserImage] = useState('')

  useEffect(() => {
    currentUser?.username && setTempUserName(currentUser.name)
    currentUser?.image && setTempUserImage(currentUser.image)
  }, [currentUser])

  return (
    currentUser === undefined || currentUser === null || currentUser === undefined
      ? <></>
      : <Section title='Editar perfil' className='userSection'>


        <Formik
          initialValues={{
            userName: tempUserName,
            userImage: tempUserImage
          }}
          validationSchema={userConfiguration}
          onSubmit={editProfile}
        >
          <Form>
            <div className="profileEditGroup">
              <div>
                <span>{tempUserName}</span> <Field type='text' name='userName' placeholder='Nombre' onChange={console.log} />
              </div>
            </div>

            <hr />

            <div className="profileEditGroup">
              <img src={tempUserImage} alt="Tu imagen de perfil" />
              <Field type='url' name='userImage' placeholder='URL a imagen' />
            </div>


            <button type='submit'>Ok</button>
          </Form>
        </Formik>
      </Section>
  )
}

export default UserSection