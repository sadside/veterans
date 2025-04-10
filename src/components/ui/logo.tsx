import React from 'react'
import MainLogo from '../../assets/icons/main-logo.png'

const Logo: React.FC = () => (
    <img
        src={MainLogo.src}
        width={50}
        alt="Новосибирское региональное отделение ОО и органов прокуратуры"
    />
)

export default Logo
