import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import styles from "../styles/Header.module.css";

 const Header = () => {
  const [activeItem, setActiveItem ] = useState({});
  let router = useRouter();

  const handleItemClick = (e) => {
    e.preventDefault();
    router.push('/');
  }
    

    return (
      <Menu color='black' inverted >
    
        <Menu.Item
          name='submit'
          active={activeItem === 'submit'}
          onClick={handleItemClick}
          className={styles.name}
        >
          Campaigns
        </Menu.Item>

        <Menu.Menu position='right'>
          {/* <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={handleItemClick}
          >
            Sign Up
          </Menu.Item> */}

          <Menu.Item
            name='help'
            active={activeItem === 'help'}
            onClick={() => router.push('/aboutus')}
            className={styles.name}
          >
            About us
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  
}

export default Header;