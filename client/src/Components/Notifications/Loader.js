import {PuffLoader} from 'react-spinners'
function Loader(){
    return(
        <div className='w-full px-2 py-2 flex-cols'>
            <PuffLoader color='#F20000' />
        </div>
    )
};

export default Loader