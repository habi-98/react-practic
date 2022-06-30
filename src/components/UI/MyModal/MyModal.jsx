import React from 'react'
import cl from './MyModal.module.css'

const MyModal = ({children, visible, setVisble}) => {

    const rootClasses = [cl.myModal]

    if(visible) {
        rootClasses.push(cl.myModal__active)
    }

    return (
        <div className={rootClasses.join(' ' )} onClick={() => setVisble(false)}>
             <div className={cl.myModalContent} onClick={e => e.stopPropagation()}>
                {children}
             </div>
        </div>
    )
}

export default MyModal;