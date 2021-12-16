import React, { useContext, /* useEffect,  */useState } from 'react'

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';

import Section from '../Section'
import { User } from "../../../contexts/UserContext";
// import { REGEX } from '../../../utils';
import axios from 'axios';
import { API_BASEURL, URL_USERS } from '../../../services/urls';
import { Window } from '../../../contexts/WindowContext';

//const defImgUrl = "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg"

const userConfiguration = Yup.object().shape({
  newImage: Yup.string()
    .nullable()
  // .matches(REGEX.urlFile, 'Ingrese una url hacia una imagen valida')
})


const UserSection = () => {
  const { loading, setLoading } = useContext(Window)
  const { currentUser, setCurrentUser } = useContext(User)

  //const [imageUrlPreview, setImagePreviewUrl] = useState('')
  const [tempUserImage, setTempUserImage] = useState<string | null>(null)

  //const changePreview = () => { if (imageUrlPreview.trim().length > 5) { setTempUserImage(imageUrlPreview) } }
  const resetPreview = () => setTempUserImage(null)

  return (
    loading
      ? <></>
      : <Section
        title='Editar perfil'
        className='userSection'
      >
        <Formik
          initialValues={{
            newImage: ''
          }}
          validationSchema={userConfiguration}
          onSubmit={(newImage) => {
            setLoading(true)
            axios.post(URL_USERS,
              newImage,
              {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json',
                  "Access-Control-Allow-Origin": API_BASEURL,
                  "Access-Control-Allow-Credentials": "true",
                }
              })
              .then((data: any) => setCurrentUser({ ...currentUser, image: data.newImage }))
              .catch(console.info)
              .finally(() => setLoading(false))
          }}
        >
          {({ errors, touched }) =>
            <Form>

              <div className="profileEditGroup">
                <span>{currentUser.email}</span>
                <span className='faint'>{currentUser.id}</span>
              </div>

              <hr />

              <div className="profileEditGroup image">
                <h4>Tu imagen</h4>
                <div className='subGroup' >
                  <img src={tempUserImage ? tempUserImage : currentUser.image} onError={console.log/* resetPreview */} alt="Tu imagen de perfil" />
                  {
                    tempUserImage
                      ? <span title='Quitar preview' className='removeImg' onClick={resetPreview}><FontAwesomeIcon icon={faMinusCircle} /></span>
                      : null
                  }
                </div>

                <div className='subGroup' title='URL Actual'>
                  <span> {currentUser.image ?? ''} </span>
                  <button type='button'>Copiar actual</button>
                </div>
                <div className='subGroup'>
                  <Field type='url' name='newImage' placeholder='URL a imagen' required={false} />
                  <button type='button'/*  onClick={changePreview} */>Preview</button>
                </div>
                {
                  errors.newImage && touched.newImage
                    ? errors.newImage
                    : null
                }
              </div>

              <div className='sendSection'>
                <button type='submit'>Guardar</button>
              </div>

            </Form>
          }
        </Formik>
      </Section >
  )
}

export default UserSection