import MainBody from '../MainBody/MainBody'
import PlacedItem from '../PlacedItem/PlacedItem'
import { Toaster } from 'react-hot-toast'


export default function Dashboard(){
    return(
        <div>
            <Toaster />
            <PlacedItem />
            <MainBody />
        </div>
    )
}