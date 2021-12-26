import React, { useEffect, useState } from 'react'

import Section from '../Section'
import { formatFullDate } from '../../../utils';
import { useParams } from 'react-router';
import { getOtherUserInfo, IUser } from '../../../services/user';
import Loading from '../../Loading/Loading';
import { CopyToClipboard } from 'react-copy-to-clipboard'

const defImgUrl = "https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-20.jpg"

const OtherUsersSection = () => {
  const { userId } = useParams()
  const [userPreview, setUserPreview] = useState<IUser | undefined | null>(undefined)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let timeout: any;
    if (copied === true) {
      timeout = setTimeout(() => {
        setCopied(false)
      }, 2000);
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [copied])

  useEffect(() => {
    if (userId) {
      getOtherUserInfo(userId)
        .then(response => {
          response.status === 200
            ? setUserPreview(response.data)
            : setUserPreview(null)
        })
        .catch(err => {
          console.error(err);
          setUserPreview(null)
        })
    }
  }, [userId])

  return (
    userPreview === undefined
      ? <Loading />
      : userPreview === null
        ? <Section
          title='Editar perfil'
          className='userSection'
        >
          <span>No encontrado {userId}</span>
        </Section>

        : <Section
          title='Editar perfil'
          className='userSection'
        >

          <div className="profileEditGroup other">
            <span>{userPreview.id}</span>
            <span className='smaller'>Registrado el: {formatFullDate(userPreview.createdAt)}</span>
          </div>

          <hr />

          <div className="profileEditGroup image">
            <h4>Imagen del usuario</h4>
            <div className='subGroup' >
              <img src={userPreview.image ? userPreview.image : defImgUrl} onError={console.log/* resetPreview */} alt={`Imagen de ${userPreview.id}`} />
            </div>

            <div className='subGroup url' title='URL Actual'>
              <span> {userPreview.image ?? 'No image'} </span>
              <CopyToClipboard onCopy={() => setCopied(true)} text={userPreview.image}>
                <button type='button'>{copied ? 'Copiado' : 'Copiar'}</button>
              </CopyToClipboard>
            </div>

          </div>

        </Section >
  )
}

export default OtherUsersSection