import style from './cardMapping.module.css'
import CardInfo from './cardInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'


export default function CardMapping({arrayName, needArrow, needBtn, handleClick, handleOnDrag, needDelete, handleDelete}){
    const [currentIndexPosition, setCurrentIndexPosition] = useState(0)
    const arrayPosition = arrayName.length - 1
    const slideMostRightPosition = 4
    const [slideArray, setSlideArray] = useState(arrayName.slice(0, slideMostRightPosition + 1))

    function checkArrayLength(){
        return arrayName.length < 5
    }

    function calculateSlide(startIndex) {
        let endIndex = startIndex + slideMostRightPosition + 1;
        
        if (endIndex <= arrayPosition + 1) {
            // Normal slice if within bounds
            return arrayName.slice(startIndex, endIndex);
        } else {
            // Handle circular movement
            const overflow = endIndex - (arrayPosition + 1);
            return arrayName.slice(startIndex, arrayPosition + 1).concat(arrayName.slice(0, overflow));
        }
    }
    
    function goToPrevious() {
        const newIndex = (currentIndexPosition === 0) ? arrayPosition : currentIndexPosition - 1;
        setCurrentIndexPosition(newIndex);
        setSlideArray(calculateSlide(newIndex));
    }
    
    function goToNext() {
        const newIndex = (currentIndexPosition + 1) % (arrayPosition + 1); // Use modulo for circular movement
        setCurrentIndexPosition(newIndex);
        setSlideArray(calculateSlide(newIndex));
    }


    useEffect(() => {
        if(arrayName.length <= slideMostRightPosition + 1){
            setSlideArray(arrayName)
        }
        else{
            setSlideArray(arrayName.slice(0, slideMostRightPosition + 1))
        }
    }, [arrayName])


    return(
        <div className="bidContainer">
            <div className={style.container}>
                {needArrow && !checkArrayLength() &&
                    <div className={style.arrow} onClick={goToPrevious}>
                        <FontAwesomeIcon icon={faChevronLeft} size="xl"/>
                    </div>
                }

                {needArrow && 
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
                {needArrow === false && 
                    arrayName.map((item, index) =>(
                        <div key={item._id || index}>
                            <CardInfo 
                                arrayName={arrayName} 
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
                {needArrow && !checkArrayLength() &&
                    <div className={style.arrow} onClick={goToNext}>
                        <FontAwesomeIcon icon={faChevronRight} size="xl"/>
                    </div>
                }
            </div>
        </div>
        
    )
}

