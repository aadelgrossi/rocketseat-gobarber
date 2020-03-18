import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo-color.svg';
import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">Dashboard</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Andre Grossi</strong>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/70/abott@adorable.png"
              alt="Andre Grossi"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
