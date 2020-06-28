import React from 'react'
import Loading from 'react-loading-components';
import Styles from '../styles/Styles';

const Loader: React.FC = () => {
    return (
        <div className="loading__container">
            <Loading type='bars' width={100} height={100} fill={Styles.blue} />
        </div>
    )
}

export default Loader