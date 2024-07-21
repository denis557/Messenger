import './sideBar.css';
import SideBarMain from '../sideBarMain/sideBarMain';
import SideBarSearch from '../sideBarSearch/sideBarSearch';
import { useSelector } from 'react-redux';

function SideBar({ loadingChats }) {
  const { page } = useSelector(state => state.page);

  return(
    <div className='sideBar'>
      {loadingChats ? 
        <p>Loading...</p>
      :
        page === 'main' ?
          <SideBarMain />
        :
        page === 'search' ?
          <SideBarSearch />
        :
        ''
      }
    </div>
  )
}

export default SideBar