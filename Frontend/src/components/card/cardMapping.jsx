import style from './cardMapping.module.css'
import CardInfo from './cardInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight, faCloudUpload } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


export default function CardMapping({arrayName, needArrow, needBtn, handleClick, handleOnDrag, needDelete, handleDelete}){
    const [currentIndexPosition, setCurrentIndexPosition] = useState(0)
    const arrayPosition = arrayName.length - 1
    const slideMostRightPosition = 4
    const initialSlide = arrayName.slice(0, slideMostRightPosition + 1)
    const [slideArray, setSlideArray] = useState(initialSlide)


    function goToPrevious(){
        if(currentIndexPosition === 0){
            setSlideArray(arrayName.slice(arrayPosition - currentIndexPosition)
                .concat(arrayName.slice(currentIndexPosition, currentIndexPosition + slideMostRightPosition)))
            setCurrentIndexPosition(arrayPosition)
        }
        else if(currentIndexPosition + slideMostRightPosition > arrayPosition){
            setSlideArray(arrayName.slice(currentIndexPosition - 1, arrayPosition + 1)
                .concat(arrayName.slice(0, slideMostRightPosition - (arrayPosition - (currentIndexPosition - 1)))))
            setCurrentIndexPosition(currentIndexPosition - 1)
        }
        else{
            setSlideArray(arrayName.slice(currentIndexPosition, currentIndexPosition + slideMostRightPosition + 1))
            setCurrentIndexPosition(currentIndexPosition - 1)
        }
    }

    function goToNext(){
        if(currentIndexPosition + slideMostRightPosition === arrayPosition){
            setSlideArray(arrayName.slice(currentIndexPosition + 1, arrayPosition + 1)
                .concat(arrayName.slice(0, slideMostRightPosition - 3)))
            setCurrentIndexPosition(currentIndexPosition + 1)
        }
        else if(currentIndexPosition + slideMostRightPosition > arrayPosition){
            setSlideArray(arrayName.slice(currentIndexPosition + 1, arrayPosition + 1)
                .concat(arrayName.slice(0, slideMostRightPosition - (arrayPosition - (currentIndexPosition + 1)))))
            setCurrentIndexPosition(currentIndexPosition === arrayPosition ? 0 : currentIndexPosition + 1)
        }
        else{
            setSlideArray(arrayName.slice(currentIndexPosition, currentIndexPosition + slideMostRightPosition + 1))
            setCurrentIndexPosition(currentIndexPosition + 1)
        }
    }

    return(
        <div className="bidContainer">
            <div className={style.container}>
                {console.log("All content: ", arrayName, needArrow, needBtn, needDelete)}
                {needArrow && <div className={style.arrow} onClick={goToPrevious}>
                    <FontAwesomeIcon icon={faChevronLeft} size="xl"/>
                </div>}
                {
                    slideArray.map((item, index) =>(
                        <div key={item._id || index}>
                            <CardInfo 
                                arrayName={slideArray} 
                                item={item} 
                                index={item._id || index} 
                                needBtn={needBtn} 
                                handleClick={handleClick} 
                                handleOnDrag={handleOnDrag} 
                                needDelete={needDelete} 
                                handleDelete={handleDelete}
                            />
                        </div>
                    ))
                }
                {needArrow && <div className={style.arrow} onClick={goToNext}>
                    <FontAwesomeIcon icon={faChevronRight} size="xl"/>
                </div>}
            </div>
        </div>
        
    )
}

