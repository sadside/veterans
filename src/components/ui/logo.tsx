import React from 'react'
import MainLogo from '../../assets/icons/main-logo.png'

const Logo: React.FC = () => (
    <a href="/">
        <img
            src={MainLogo.src}
            width={50}
            alt="Новосибирское региональное отделение ОО и органов прокуратуры"
        />
    </a>
)

export default Logo
